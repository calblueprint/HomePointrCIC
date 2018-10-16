class PropertiesController < ApplicationController
  def index
  	@properties = Property.all
  end

  def new
  	@property = Property.new
  end

  def create
  	property = Property.new(property_params)
  	if property.save
      redirect_to properties_path
    else
      error_response(property)
    end
  end

  def show
  	@property = Property.find(params[:id])
    @applications = @property.applications
  end

  def edit
  	@property = Property.find(params[:id])
	end

  def update
		@property = Property.find(params[:id])
    @property.update(property_params)
    redirect_to properties_path
  end

  def destroy
  	@property = Property.find(params[:id])
		@property.destroy
		redirect_to properties_path
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
