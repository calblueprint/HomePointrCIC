class ApplicationsController < ApplicationController
  def index
  	@applications = Application.all
  end

  def new
  	@application = Application.new
  end

  def create
  	application = Application.new(application_params)
  	if application.save
      redirect_to applications_path
    else
      error_response(application)
    end
  end

  def show
  	@application = Application.find(params[:id])
  	@info = @application.info
  	@application_tenant = @info.tenant
  	@property = @application.property
  end

  def destroy
  	@application = Application.find(params[:id])
		@application.destroy
		redirect_to applications_path
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
