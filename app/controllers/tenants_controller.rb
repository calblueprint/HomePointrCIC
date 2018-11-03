class TenantsController < ApplicationController
  def index
    @tenants = Tenant.all
  end

  def new
    @tenant = Tenant.new
    render react_component: 'TenantForm', props: { tenant: @tenant }
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
    @tenant = Tenant.find(params[:id])
    render react_component: 'TenantForm', props: { tenant: @tenant }
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
