class ApplicationsController < ApplicationController
  def new
    @application = Application.new
  end

  def create
    @application = Application.create!(application_params)

    authorize @application
    if @application.save
      ApplicationsMailer.with(application: @application).new_application.deliver_now
      redirect_to tenant_path(id: @application.info.tenant.id)
    else
      render json: { errors: @application.errors.messages }
    end
  end

  def show
    @application = Application.find(params[:id])
    authorize @application
    @status = @application.status

    tenant = @application.info.tenant
    field_values = tenant.attributes.values[3..-3]
    field_names = Tenant.column_names[3..-3]
    nice_field_names = []
    field_names.each do |field_name|
      nice_field_names << field_name.titleize
    end
    tenant_tag_values = []
    nice_field_names.each_with_index {| tag, index |
      tenant_tag_values << tag.to_s + ": " + field_values[index].to_s
    }

    ra = tenant.referral_agency
    field_values = [ra.email, ra.address, ra.phone]
    field_names = ['email', 'Address', 'Phone Number']
    ra_tag_values = []
    field_names.each_with_index {| tag, index |
      ra_tag_values << tag.to_s + ": " + field_values[index].to_s
    }

    @tenantProps = [tenant.id, tenant.name, "ra_matching", tenant.description, tenant_tag_values, tenant.priority]
    @raProps = [ra.id, ra.name, ra_tag_values]
    @buttonProps = [@application.id, @status]
  end

  def index   
    @tenant = Tenant.find(params[:tenant_id])
    authorize @tenant, policy_class: TenantPolicy                          
    @applications = @tenant.applications 
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
    params.require(:application).permit(:status)
  end

end
