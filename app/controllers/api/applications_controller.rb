class Api::ApplicationsController < ApplicationController

  def show
    application = Application.find(params[:id])
    render json: application
  end

end 