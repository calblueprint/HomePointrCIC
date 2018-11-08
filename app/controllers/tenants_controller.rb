class TenantsController < ApplicationController
  def index
    @tenants = Tenant.all
  end

  def new
    @tenant = Tenant.new
    @mode = "create"
    @type = "tenant"
    enums = []
    @field_names = Tenant.column_names[1..-3]
    @field_names.each do |i|
      if Tenant.defined_enums.keys.include? i
        enums << Tenant.defined_enums[i].keys
      end
    end
    num_fields = @field_names.length
    @prev_values = Array.new(num_fields, "")
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "textbox", "textbox", "textbox", enums[0], enums[1], "textbox", enums[2], "textbox"]
  end

  def create
    tenant = Tenant.new(tenant_params)
    authorize tenant
    if tenant.save
      Info.create(tenant_id: tenant.id)
      redirect_to tenants_path
    else
      render json: { errors: tenant.errors.messages }
    end
  end

  def show
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @applications = @tenant.info.applications
  end

  def edit 
    @tenant = Tenant.find(params[:id])
    authorize @tenant
  end

  def index                                             
    @tenants = TenantPolicy::Scope.new(current_user, Tenant).resolve
  end

  def edit
    @mode = "edit"
    @type = "tenant"
    enums = []
    @field_names = Tenant.column_names[1..-3]
    @field_names.each do |i|
      if Tenant.defined_enums.keys.include? i
        enums << Tenant.defined_enums[i].keys
      end
    end
    @tenant = Tenant.find(params[:id])
    @prev_values = @tenant.attributes.values[1..-3]
    @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "textbox", "textbox", "textbox", enums[0], enums[1], "textbox", enums[2], "textbox"]
  end

  def update
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    if @tenant.update(tenant_params)
      redirect_to tenants_path
    else
      render json: { errors: @tenant.errors.messages }
    end
  end

  def destroy
    tenant = Tenant.find(params[:id])
    authorize tenant
    if tenant.destroy
      redirect_to tenants_path
    else
      render json: { errors: tenant.errors.messages }
    end
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
