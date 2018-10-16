class TenantsController < ApplicationController
  def index
  	@tenants = Tenant.all
  end

  def new
  	@tenant = Tenant.new
  end

  def create
  	tenant = Tenant.new(tenant_params)
  	if tenant.save
  		Info.create(tenant_id: tenant.id)
      redirect_to tenants_path
    else
      error_response(tenant)
    end
  end

  def show
  	@tenant = Tenant.find(params[:id])
    @applications = @tenant.info.applications
  end

  def edit
  	@tenant = Tenant.find(params[:id])
	end

  def update
		@tenant = Tenant.find(params[:id])
    @tenant.update(tenant_params)
    redirect_to tenants_path
  end

  def destroy
  	@tenant = Tenant.find(params[:id])
		@tenant.destroy
		redirect_to tenants_path
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
