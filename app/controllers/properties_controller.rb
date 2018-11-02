class PropertiesController < ApplicationController
  def new
    @property = Property.new
  end

  def index
    @properties = Property.all
  end

  def new
    @property = Property.new
    render react_component: 'NewPropertyForm', props: { property: @property }
  end

  def create
    property = Property.new(property_params)
    authorize property
    if property.save
      @mode = "create"
      @type = "property"
      @field_names = ["Property Name", "Description", "Rent", "Housing Type", "Property Type", "Location", "Capacity", "Number of Bedrooms", "Date Available", "Upload Pictures"]
      @field_types = ["textbox", "textbox", "textbox", "dropdown", "dropdown", "dropdown", "textbox”, “textbox”, “textbox”, “upload"]
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
  end

  def show
    @property = Property.find(params[:id])
    authorize @property 
    @applications = @property.applications
  end
  
  def edit
    @mode = "edit"
    @type = "property"
    @field_names = ["Property Name", "Description", "Rent", "Housing Type", "Property Type", "Location", "Capacity", "Number of Bedrooms", "Date Available", "Upload Pictures"]
    @field_types = ["textbox", "textbox", "textbox", "dropdown", "dropdown", "dropdown", "textbox”, “textbox”, “textbox”, “upload"]
    @property = Property.find(params[:id])
    authorize @property
    @applications = @property.applications
    render react_component: 'ProfileForm', props: { property: @property }
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
