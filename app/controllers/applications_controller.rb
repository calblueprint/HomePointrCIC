# frozen_string_literal: true

class ApplicationsController < ApplicationController
  def new
    @tenant_id = params[:id]
    @tenant=Tenant.find(@tenant_id)
    @tenantImage = []
    @tenantImage << if @tenant.avatar.attached?
                       { avatar: url_for(@tenant.avatar) }
                     else
                       { avatar: nil }
                     end
    @tenantPriority = [{ priority: @tenant.priority }]
    @properties = Property.all
    alreadyApplied = []
    @tenant.applications.each do |a|
      alreadyApplied << a.property
    end
    @properties = (@properties - alreadyApplied) | (alreadyApplied - @properties)
    @propertyImages = []
    @properties.each do |p|
      if p.images.attached?
        image_list = p.images.map { |img| { url: url_for(img) } }
        @propertyImages << { images: image_list }
      else
        @propertyImages << { images: nil }
      end
    end

    @propertyForms = []
    @properties.each do |p|
      if p.form.attached?
        @propertyForms << { form: url_for(p.form), form_name: p.form.filename }
      else
        @propertyForms << { form: nil, form_name: nil }
      end
    end

    @housing_type_options = Property.housing_types.keys
    @property_type_options = Property.property_types.keys
    @location_options = Property.locations.keys
    @application = Application.new
  end

  def show
    @application = Application.find(params[:id])
    @application_tenant = @application.tenant
    authorize @application
    @property = @application.property
    @status = @application_tenant.priority
  end

  def index
    # @tenant = Tenant.find(params[:tenant_id])
    # authorize @tenant, policy_class: TenantPolicy
    # @applications = @tenant.applications
    @applications = Application.all
  end

  def edit
    @application = Application.find(params[:id])
    authorize @application
  end

  def destroy
    application = Application.find(params[:id])
    authorize application
    if application.destroy
      redirect_to applications_path
    else
      render json: { errors: application.errors.messages }
    end
  end

  private

  def application_params
    params.require(:application).permit(AppPolicy.permitted_attributes)
  end
end
