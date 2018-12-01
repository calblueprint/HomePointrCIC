class ApplicationsController < ApplicationController
  def new
    @tenants = Tenant.where(referral_agency: current_user)
    @properties = Property.all
    @application = Application.new
  end

  def create
    @application = Application.create!(application_params)

    authorize @application
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
      redirect_to tenant_path(id: @application.info.tenant.id)
    else
      render json: { errors: @application.errors.messages }
    end
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
    @tenant = Tenant.find(params[:tenant_id])
    authorize @tenant, policy_class: TenantPolicy                          
    @applications = @tenant.applications 
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

  private
    
  def application_params
    params.require(:application).permit(AppPolicy.permitted_attributes)
  end
end
