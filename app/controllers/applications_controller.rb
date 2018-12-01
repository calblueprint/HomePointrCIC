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
  end

  def index   
    @tenant = Tenant.find(4)
    @property = Property.find(2)
    # authorize @tenant, policy_class: TenantPolicy
    @tenants = []
    if current_user.type == 'Landlord'

      # @tenants = Tenant.where.not()
    else
      @property.applications.each do |app|
        if app.status != 'housed'
          @tenants.push(app.info.tenant)
        end
      end
    end                          
    
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
