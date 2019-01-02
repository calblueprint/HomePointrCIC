class PropertiesController < ApplicationController
  def index
    @properties = PropertyPolicy::Scope.new(current_user, Property).resolve
    @images = []
    @properties.each do |p|
      if p.images.attached? == true
        image_list = p.images.map{|img| ({ image: url_for(img) })}
        @images << {url: image_list[0][:image]}
      end
    end
  end

  def new
    if ActiveStorage::Blob.last != nil
      $activestoragestart = ActiveStorage::Blob.last.id
    else
      $activestoragestart = 0
    end
    @property = Property.new
    authorize @property
    @mode = "create"
    @type = "properties"
    enums = []
    @field_names = Property.column_names[1..-1] 
    # @field_names = Property.column_names[1..-1] + ["images", "form"]
    @nice_field_names = []
    @field_names.each do |i|
      @nice_field_names << i.titleize
      if Property.defined_enums.keys.include? i
        enums << Property.defined_enums[i].keys
      end
    end
    num_fields = @field_names.length
    @prev_values = Array.new(num_fields, "")
    @field_types = ["textbox", "textarea", "id", "textbox", "textbox", enums[0], enums[1], "datepicker", enums[2], "attachment", "form"]
    # @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", enums[0], enums[1], "datepicker", enums[2]]
    @current_userID = current_user.id
  end

  def show
    @property = Property.find(params[:id])
    authorize @property
    field_names = Property.column_names[1..-1] 
    field_values = @property.attributes.values[1..-1] #change start index
    field_names.delete_at(1)
    field_values.delete_at(1)
    nice_field_names = []
    field_names.each do |field_name|
      nice_field_names << field_name.titleize
    end
    @tag_values = []
    nice_field_names.each_with_index {| tag, index |
      @tag_values << tag.to_s + ": " + field_values[index].to_s
    }
    @images = nil
    if @property.images.attached? == true
      image_list = @property.images.map{|img| ({ url: url_for(img) })}
      @images = image_list
    end
    @name = (@property.housing_type + " in " + @property.location).titleize
    @description = @property.attributes.values[2]
    
    @tenants = []
    @tenantImages = []
    @tenantApps = []
    @tenantAppsPDF = []
    @potentialTenants = []
    @potentialTenantsImages = []
    @potentialTenantApps = []
    @potentialTenantAppsPDF = []
    @property.applications.each do |a|
      if a.status == 'housed'
        @tenants << a.info.tenant
        if a.info.tenant.avatar.attached?
          @tenantImages << {url: url_for(a.info.tenant.avatar)}
        else
          @tenantImages << {url: nil}
        end
        if a.form.attached?
          @tenantAppsPDF << {url: url_for(a.form)}
        else
          @tenantAppsPDF << {url: nil}
        end
        @tenantApps << a
      elsif a.status == 'received' or a.status == 'interview'
        @potentialTenants << a.info.tenant
        if a.info.tenant.avatar.attached?
          @potentialTenantsImages << {url: url_for(a.info.tenant.avatar)}
        else
          @potentialTenantsImages << {url: nil}
        end
        if a.form.attached?
          @potentialTenantAppsPDF << {url: url_for(a.form)}
        else
          @potentialTenantAppsPDF << {url: nil}
        end
        @potentialTenantApps << a
      end
    end 
  end
  
  def edit
    @mode = "edit"
    @type = "properties"
    enums = []
    @nice_field_names = []
    @field_names = Property.column_names[1..-1] + ["images", "form"]
    @field_names.each do |i|
      @nice_field_names << i.titleize
      if Property.defined_enums.keys.include? i
        enums << Property.defined_enums[i].keys
      end
    end
    @property = Property.find(params[:id])
    authorize @property
    @prev_values = @property.attributes.values[1..-1]
    if @property.images.attached? == false
      @prev_values << @property.images
    else
      @prev_values << @property.images.map{|img| ({ image: url_for(img), id: img.id })}
    end
    if @property.form.attached? == false
      @prev_values << nil
    else
      @prev_values << { image: url_for(@property.form.attachment), id: @property.form.attachment.id }
    end
    @field_types = ["textbox", "textarea", "id", "textbox", "textbox", enums[0], enums[1], "datepicker", enums[2], "attachment", "form"]
    @current_userID = current_user.id
  end
end
