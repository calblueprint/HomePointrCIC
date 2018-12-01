class ApplicationsController < ApplicationController
  def new
    @tenants = Tenant.where(referral_agency: current_user)
    @properties = Property.all
    @application = Application.new
  end

  def show
    @application = Application.find(params[:id])
    @info = @application.info
    @application_tenant = @info.tenant
    authorize @application
    @property = @application.property
    @status = @application_tenant.priority
  end

  def index   
    # @tenant = Tenant.find(params[:tenant_id])
    # authorize @tenant, policy_class: TenantPolicy                          
    # @applications = @tenant.applications 
    @applications = Application.all
  end

  def edit
    @application = Application.find(params[:id])
    authorize @application
  end

  def destroy
    application = Application.find(params[:id])
    authorize application
    if application.destroy
      redirect_to applications_path
    else
      render json: { errors: application.errors.messages }
    end
  end
end
