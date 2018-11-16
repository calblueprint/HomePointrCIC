class TenantsController < ApplicationController
  def index
    @tenants = Tenant.all
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
  end

  def index                                             
    @tenants = Tenant.all
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
