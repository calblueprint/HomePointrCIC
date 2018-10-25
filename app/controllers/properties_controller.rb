class PropertiesController < ApplicationController
  def create
    property = Property.new(property_params)
    if property.save
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
  end

  def show
    @property = Property.find(params[:id])
    authorize @property #both RA and Landlord should be able to see a property..so actually don't really need to auth here?
    @applications = @property.applications
  end

  def index                                             
    @properties = policy_scope(Property)
    # @tasks = policy_scope(Task)
     # authorize @properties
  end
  def update
    property = Property.find(params[:id])
    authorize @property # only a landlord can update a property
    if property.update(property_params)
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
  end

  def destroy
    property = Property.find(params[:id])
    if property.destroy
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
  end

  private
    
  def property_params
    params.require(:property).permit(
      :capacity,
      :description,
      :landlord_id,
      :rent,
      :size,
      :property_type,
      :housing_type,
      :date_available,
      :location
    )
  end
end
