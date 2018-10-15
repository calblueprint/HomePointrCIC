class InfosController < ApplicationController

	def index
		@infos = Info.all
	end

	def new
		@info = Info.new
	end

  def create
  	info = Info.new(info_params)
  	if info.save
      redirect_to infos_path
    else
      error_response(info)
    end
  end

  private
  	
	def info_params
		params.require(:info).permit(
      :tenant_id
    )
	end
end
