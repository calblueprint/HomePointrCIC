# class ApplicationSerializer < ActiveModel::Serializer
#   attributes :status,
#              :application_tenant,
#              :application_property,
#              :application_referral_agency
#   def application_tenant
#     info = object.info
#     tenant =  info.tentant
#   end
#
#   def application_property
#     property = object.property
#   end
#
#   def application_referral_agency
#     info = object.info
#     tenant =  info.tentant
#     referral_agency = tenant.referral_agency
#   end
#
# end