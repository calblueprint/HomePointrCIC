class ApplicationsController < ApplicationController
	def create
		application = Application.new(application_params)
		if application.save
			redirect_to applications_path
		else
			render json: { errors: application.errors.messages }
		end
	end

	def show
		@application = Application.find(params[:id])
		@info = @application.info
		@application_tenant = @info.tenant
		@property = @application.property
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
