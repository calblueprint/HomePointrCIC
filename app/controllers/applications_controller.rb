class ApplicationsController < ApplicationController
  def create
    @application = Application.new(application_params)
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
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
    params.require(:application).permit(
      :status,
      :property_id,
      :info_id
    )
  end
end
