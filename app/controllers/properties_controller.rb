class PropertiesController < ApplicationController
  def new
    @property = Property.new
  end

  def index
    @properties = Property.all
  end

  def new
    @property = Property.new
    @mode = "create"
    @type = "property"
    @field_names = ["Property Name", "Description", "Rent", "Housing Type", "Property Type", "Location", "Capacity", "Number of Bedrooms", "Date Available", "Upload Pictures"]
    @field_types = ["textbox", "textbox", "textbox", "dropdown", "dropdown", "dropdown", "textbox", "textbox", "textbox", "upload"]
    render react_component: 'ProfileForm', props: { property: @property, mode: @mode, type: @type, prevValues: @prev_values, fieldNames: @field_names, fieldTypes: @field_types }
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
    @applications = @property.applications
  end
  
  def edit
    @mode = "edit"
    @type = "property"
    enums = []
    @field_names = Property.column_names
    @field_names.each do |i|
      if Property.defined_enums.keys.include? i
        enums << Property.defined_enums[i].keys
      end
    end
    @field_types = ["textbox", "textbox", "textbox", enums[0], enums[1], enums[2], "textbox", "textbox", "textbox"]
    @property = Property.find(params[:id])
    authorize @property
    @applications = @property.applications
    render react_component: 'PropertyForm', props: { property: @property, mode: @mode, type: @type, prevValues: @prev_values, fieldNames: @field_names,fieldTypes: @field_types }
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
