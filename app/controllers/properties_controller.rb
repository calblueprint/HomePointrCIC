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
    @type = "properties"
    enums = []
    # @field_names = ["Property Name", "Description", "Rent", "Housing Type", "Property Type", "Location", "Capacity", "Number of Bedrooms", "Date Available", "Upload Pictures"]
    @field_names = Property.column_names[1..-1]
    @field_names.each do |i|
      if Property.defined_enums.keys.include? i
        enums << Property.defined_enums[i].keys
      end
    end
    num_fields = @field_names.length
    @prev_values = Array.new(num_fields, "")
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", enums[0], enums[1], "textbox", enums[2]]
  end

  def create
    property = Property.new(property_params)
    authorize property
    if property.save
      redirect_to properties_path
    else
      render json: { errors: property.errors.messages }
    end
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", enums[0], enums[1], "datepicker", enums[2]]
  end

  def show
    @property = Property.find(params[:id])
    authorize @property 
    @applications = @property.applications
  end
  
  def edit
    @mode = "edit"
    @type = "properties"
    enums = []
    @nice_field_names = []
    @field_names = Property.column_names[1..-1]
    @field_names.each do |i|
      @nice_field_names << i.titleize
      if Property.defined_enums.keys.include? i
        enums << Property.defined_enums[i].keys
      end
    end
    @property = Property.find(params[:id])
    authorize @property
    @prev_values = @property.attributes.values[1..-1]
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", enums[0], enums[1], "datepicker", enums[2]]
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
end
