class TenantsController < ApplicationController
  def index
    if ReferralAgency.exists?(current_user.id)
      user = ReferralAgency.find(current_user.id)
      @tenants = Tenant.where(referral_agency: user)
    else
      user = Landlord.find(current_user.id)
      redirect_to errors_show_path
    end
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
    @housing_type_options = Property.housing_types.keys
    @property_type_options = Property.property_types.keys
    @location_options = Property.locations.keys
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
end
