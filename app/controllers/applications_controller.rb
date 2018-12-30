class ApplicationsController < ApplicationController
  def new
    @tenants = Tenant.where(referral_agency: current_user)
    @tenantImages = []
    @tenantPriorities = []
    @tenants.each do |t|
      @tenantPriorities << {priority: t.priority}
      if t.avatar.attached?
        @tenantImages << {url: url_for(t.avatar)}
      else
        @tenantImages << {url: nil}
      end
    end
    @properties = Property.all
    @propertyImages = []
    @properties.each do |p|
      if p.images.attached?
        image_list = p.images.map{|img| ({ url: url_for(img) })}
        @propertyImages << {images: image_list}
      else
        @propertyImages << {images: nil}
      end
    end
    @housing_type_options = Property.housing_types.keys
    @property_type_options = Property.property_types.keys
    @location_options = Property.locations.keys
    @application = Application.new
  end

  def show
    @application = Application.find(params[:id])
    @info = @application.info
    @application_tenant = @info.tenant
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
