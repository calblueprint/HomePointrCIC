# frozen_string_literal: true

class Api::ApplicationsController < ApplicationController
  def show
    application = Application.find(params[:id])
    render json: application
  end

  def create
    @application = Application.new(application_params)
    authorize @application
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
      @application.form.attach(ActiveStorage::Blob.last)
      render json: @application
    else
      render json: { errors: @application.errors.messages }
    end
  end

  # request sent here api/applications/22/update
  def update
    @application = Application.find(params[:id])
    authorize @application
    if @application.update_attributes(application_params)
      render json: @application
    else
      render json: { errors: @application.errors.messages }
    end
  end

  private

  def application_params
    if current_user.type == 'ReferralAgency'
      params.require(:application).permit(%i[status property_id tenant_id description form])
    else
      params.require(:application).permit([:status])
    end
  end
end
