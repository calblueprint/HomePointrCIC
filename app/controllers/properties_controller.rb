class PropertiesController < ApplicationController
  def new
    @property = Property.new
  end

  def create
    property = Property.new(property_params)
    authorize property
    if property.save
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
  end

  def show
    @property = Property.find(params[:id])
    authorize @property
    @field_names = Property.column_names[1..-1]
    @field_values = @property.attributes.values[1..-1]
    @applications = @property.applications
  end

  def edit 
    @property = Property.find(params[:id])
    authorize @property
  end

  def index
    @properties = PropertyPolicy::Scope.new(current_user, Property).resolve
    # authorize @properties
  end
  
  def update
    property = Property.find(params[:id])
    authorize property 
    if property.update(property_params)
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
  end

  def destroy
    property = Property.find(params[:id])
    authorize property
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
