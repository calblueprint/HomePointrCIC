# frozen_string_literal: true

class PropertiesController < ApplicationController
  def index
    @properties = PropertyPolicy::Scope.new(current_user, Property).resolve
    @images = []
    @properties.each do |p|
      if p.images.attached? == true
        image_list = p.images.map { |img| { image: url_for(img) } }
        @images << { images: image_list[0][:image] }
      else
        @images << { images: nil }
      end
    end
  end

  def new
    $activestoragestart = if !ActiveStorage::Blob.last.nil?
                            ActiveStorage::Blob.last.id
                          else
                            0
                          end
    @property = Property.new
    authorize @property
    # @mode = 'create'
    # @type = 'properties'
    # enums = []
    # @field_names = Property.column_names[1..-1]
    # # @field_names = Property.column_names[1..-1] + ["images", "form"]
    # @nice_field_names = []
    # @field_names.each do |i|
    #   @nice_field_names << i.titleize
    #   enums << Property.defined_enums[i].keys if Property.defined_enums.key?(i)
    # end
    # num_fields = @field_names.length
    # @prev_values = Array.new(num_fields, '')
    # @field_types = ['textbox', 'textarea', 'id', 'textbox', 'textbox', enums[0], enums[1], 'datepicker', enums[2], 'textbox', 'attachment', 'form']
    # # @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", enums[0], enums[1], "datepicker", enums[2]]
    @current_userID = current_user.id
    @categories = get_property_category_enums()
  end

  def show
    @property = Property.find(params[:id])
    authorize @property
    # field_names = Property.column_names[1..-1]
    # field_values = @property.attributes.values[1..-1] # change start index
    # field_names.delete_at(1)
    # field_values.delete_at(1)
    # nice_field_names = []
    # field_names.each do |field_name|
    #   nice_field_names << field_name.titleize
    # end
    # @tag_values = []
    # nice_field_names.each_with_index do |tag, index|
    #   @tag_values << tag.to_s + ': ' + field_values[index].to_s
    # end
    @images = nil
    if @property.images.attached? == true
      image_list = @property.images.map { |img| { url: url_for(img) } }
      @images = image_list
    end
    @name = (@property.housing_type + ' in ' + @property.location).titleize
    @description = @property.attributes.values[2]

    @propertys = []
    @propertyImages = []
    @propertyApps = []
    @propertyAppsPDF = []
    @potentialpropertys = []
    @potentialpropertysImages = []
    @potentialpropertyApps = []
    @potentialpropertyAppsPDF = []
    @property.applications.each do |a|
      if a.status == 'housed'
        @propertys << a.property
        @propertyImages << if a.property.avatar.attached?
                           { url: url_for(a.property.avatar) }
                         else
                           { url: nil }
                         end
        @propertyAppsPDF << if a.form.attached?
                            { url: url_for(a.form) }
                          else
                            { url: nil }
                          end
        @propertyApps << a
      elsif (a.status == 'received') || (a.status == 'interview')
        @potentialpropertys << a.property
        @potentialpropertysImages << if a.property.avatar.attached?
                                     { url: url_for(a.property.avatar) }
                                   else
                                     { url: nil }
                                   end
        @potentialpropertyAppsPDF << if a.form.attached?
                                     { url: url_for(a.form) }
                                   else
                                     { url: nil }
                                   end
        @potentialpropertyApps << a
      end
    end
  end

  def edit
    @mode = 'edit'
    @type = 'properties'
    @property = Property.find(params[:id])
    authorize @property
    @current_userID = current_user.id
    @categories = get_property_category_enums()
  end

  def get_property_category_enums
    @nice_housing_type = []
    @nice_property_type = []
    @nice_location = []
    Property.housing_types.keys.each do |i|
      @nice_housing_type << i.titleize
    end
    Property.property_types.keys.each do |i|
      @nice_property_type << i.titleize
    end
    Property.locations.keys.each do |i|
      @nice_location << i.titleize
    end
    categories = {
      housing_types: Property.housing_types.keys,
      property_types: Property.property_types.keys,
      locations: Property.locations.keys,
      nice_housing_types: @nice_housing_type,
      nice_property_types: @nice_property_type,
      nice_locations: @nice_location
    }
  end
end
