class ApplicationsController < ApplicationController
  def create
    @application = Application.new(application_params)
    authorize @application #only an RA can create an application
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
      redirect_to applications_path
    else
      render json: { errors: @application.errors.messages }
    end
  end

  def show
    @application = Application.find(params[:id])
    @info = @application.info
    @application_tenant = @info.tenant
    authorize @application_tenant #need to verify that the tenant belongs to the user in order to see their application
    @property = @application.property
  end

  def index   
    # should be passed in a Tenant ID and need to verify that the Tenant belongs to the current user
    @tenant = Tenant.find(params[:tenant_id])
    authorize @tenant                          
    @applications = @tenant.applications #do I still need to authorize?
  end

  def update
    # RA can update general information
    @application = Applicaion.find(params[:id])
    authorize @application
    # landlord can only update the status of an application
  end

  def update_status
    #only for landlord!
    @application = Application.find(params[:id])
    authorize @application
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
    params.require(:application).permit(
      :status,
      :property_id,
      :info_id
    )
  end
end
