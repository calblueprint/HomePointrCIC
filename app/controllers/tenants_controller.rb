class TenantsController < ApplicationController

  def index
    @tenants = TenantPolicy::Scope.new(current_user, Tenant).resolve
  end

  def new
    @tenant = Tenant.new
    authorize @tenant
    @mode = "create"
    @type = "tenants"
    enums = []
    @field_names = Tenant.column_names[1..-3]
    @nice_field_names = []
    @field_names.each do |i|
      @nice_field_names << i.titleize
      if Tenant.defined_enums.keys.include? i
        enums << Tenant.defined_enums[i].keys
      end
    end
    num_fields = @field_names.length
    @prev_values = Array.new(num_fields, "")
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "slider", "_slider", enums[0], enums[1], "textbox", enums[2], "textbox", "datepicker"]
  end

  def show
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @applications = @tenant.info.applications
    @status = @tenant.priority
    @name = @tenant.attributes.values[1]
    @description = @tenant.attributes.values[2]
    values = @tenant.attributes.values[3..-3]
    field_names = Tenant.column_names[3..-3]
    nice_field_names = []
    field_names.each do |field_name|
      nice_field_names << field_name.titleize
    end
    @tag_values = []
    nice_field_names.each_with_index {| tag, index |
      @tag_values << tag.to_s + ": " + values[index].to_s
    }
  end

  def edit
    @mode = "edit"
    @type = "tenants"
    enums = []
    @field_names = Tenant.column_names[1..-3]
    @nice_field_names = []
    @field_names.each do |i|
      @nice_field_names << i.titleize
      if Tenant.defined_enums.keys.include? i
        enums << Tenant.defined_enums[i].keys
      end
    end
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @prev_values = @tenant.attributes.values[1..-3]
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "slider", "_slider", enums[0], enums[1], "textbox", enums[2], "textbox", "datepicker"]
  end

  private
    
  def tenant_params
    params.require(:tenant).permit(
      :name,
      :description,
      :email,
      :phone,
      :nino,
      :rent_min,
      :rent_max,
      :housing_type,
      :property_type,
      :num_bedrooms,
      :location,
      :referral_agency_id,
      :date_needed
    )
  end
end
