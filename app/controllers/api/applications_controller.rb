class Api::ApplicationsController < ApplicationController

  def show
    application = Application.find(params[:id])
    render json: application
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

end