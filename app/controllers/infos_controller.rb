class InfosController < ApplicationController
  def create
    info = Info.new(info_params)
    if info.save
      redirect_to infos_path
    else
      render json: { errors: info.errors.messages }
    end
  end

  private
    
  def info_params
    params.require(:info).permit(
      :tenant_id
    )
  end
end
