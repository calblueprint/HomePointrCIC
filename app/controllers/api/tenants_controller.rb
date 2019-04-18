# frozen_string_literal: true

class Api::TenantsController < ApplicationController
  respond_to :json

  def create
    @tenant = Tenant.new(tenant_params)
    # authorize @tenant
    if @tenant.save
      if ActiveStorage::Blob.last.id != $activestoragestart
        a = ActiveStorage::Blob.last
        @tenant.avatar.attach(a) if a.image?
      end
      render json: @tenant
    else
      render json: { errors: @tenant.errors.messages }
    end
  end

  def update
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    # if @tenant.update(tenant_params)
    #   render json: @tenant
    # else
    #   render component: 'ErrorMessage', message: @tenant.errors.messages
    # end
    tenant_attr = tenant_params
    avatar_attr = tenant_attr.delete("avatar")
    form_attr = tenant_attr.delete("form")
    # @tenant = Tenant.find(params[:id])
    saved = @tenant.update(tenant_attr)
    if saved
      @tenant.avatar.attach(avatar_attr)
      # if ActiveStorage::Blob.last.id != $activestoragestart
      #   a = ActiveStorage::Blob.last
      #   @tenant.avatar.attach(a) if a.image?
      # end
      @tenant.form.attach(form_attr)
      flash[:success] = "Tenant updated successfully!"
      render json: @tenant
    else
      flash[:danger] = "Tenant failed to update."
    end
  end

  def destroy
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    if @tenant.destroy
      render json: @tenant
    else
      render json: { errors: @tenant.errors.messages }
    end
  end

  private

  def tenant_params
    params.require(:tenant).permit(
      :name,
      :description,
      :email,
      :phone,
      :rent_min,
      :rent_max,
      :housing_type,
      :property_type,
      :number_of_bedrooms,
      :location,
      :referral_agency_id,
      :date_needed,
      :avatar,
      :form,
      :number_of_bathrooms,
      :mobility_aids,
      :accessible_shower,
      :car_parking,
      :lift_access,
    )
  end
end
