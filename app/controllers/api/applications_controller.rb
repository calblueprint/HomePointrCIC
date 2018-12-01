class Api::ApplicationsController < ApplicationController

  def show
    application = Application.find(params[:id])
    render json: application
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

  #request sent here api/applications/22/update
  def update
    @application = Application.find(params[:id])
    authorize @application
    if @application.update_attributes(application_params)
      redirect_to application_path
    else
      render json: { errors: @application.errors.messages }
    end
  end

  private
    
  def application_params
    params.require(:application).permit(AppPolicy.permitted_attributes)
  end
end