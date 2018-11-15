class PropertySerializer < ActiveModel::Serializer
  attributes :status,
             :property_tenants,
             :property_applications,
  def property_tenants
    tenants = object.tenants
  end

  # def application_property
  #   property = object.property
  # end

  # def application_referral_agency 
  #   info = object.info
  #   tenant =  info.tentant 
  #   referral_agency = tenant.referral_agency
  # end

end