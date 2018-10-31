class ApplicationsController < ApplicationController
  def new
    @application = Application.new
  end

  def create
    @application = Application.new(application_params)
    authorize @application
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
      redirect_to tenant_path(@application.info.tenant)
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

  def update
    @application = Application.find(params[:id])
    authorize @application
    if @application.update_attributes(application_params)
      redirect_to applications_path
    else
    render json: { errors: @application.errors.messages }
    end
  end

  def destroy
    application = Application.find(params[:id])
    if application.destroy
      redirect_to applications_path
    else
      render json: { errors: application.errors.messages }
    end
  end

  private
    
  def application_params
    params.require(:application).permit(policy(@application).permitted_attributes)
  end
end
