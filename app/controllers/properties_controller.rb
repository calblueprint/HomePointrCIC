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
    @field_names = Property.column_names[1..-1]
    @nice_field_names = []
    @field_names.each do |i|
      @nice_field_names << i.titleize
      if Property.defined_enums.keys.include? i
        enums << Property.defined_enums[i].keys
      end
    end
    num_fields = @field_names.length
    @prev_values = Array.new(num_fields, "")
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
end
