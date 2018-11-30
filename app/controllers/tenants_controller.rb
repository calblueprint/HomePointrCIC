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
    # @field_names = Tenant.column_names[1..-3] + ["avatar"]
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
    # @prev_values << @tenant.avatar
    # @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "slider", "_slider", enums[0], enums[1], "textbox", enums[2], "textbox", "datepicker", "attachment"]
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "slider", "_slider", enums[0], enums[1], "textbox", enums[2], "textbox", "datepicker"]
  end

  def show
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @applications = @tenant.info.applications
  end

  def edit
    @mode = "edit"
    @type = "tenants"
    enums = []
    @field_names = Tenant.column_names[1..-3] + ["avatar"]
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
    if @tenant.avatar.attached? == false
      @prev_values << @tenant.avatar
    else
      @prev_values << [{id: @tenant.avatar.id, url: url_for(@tenant.avatar)}]
    end
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "slider", "_slider", enums[0], enums[1], "textbox", enums[2], "textbox", "datepicker", "attachment"]
  end
end
