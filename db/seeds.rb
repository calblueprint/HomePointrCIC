# Constants
NUM_LANDLORDS = 10
NUM_REFERRAL_AGENCIES = 10
NUM_PROPERTIES = 30
NUM_TENTANTS = 30

def make_landlords
  1.upto(NUM_LANDLORDS) do |n|
    landlord = Landlord.create(
      name: Faker::Name.name,
      email: "user#{n}@gmail.com",
      password: "password",
      password_confirmation: "password",
      phone: Faker::PhoneNumber.cell_phone.gsub(/-/, ''),
      address: Faker::Address.street_address
    )
    landlord.save
    printf("#{n}/#{NUM_LANDLORDS} Landlords \r")
  end
  puts "\n"
end

def make_referral_agencies
  (NUM_LANDLORDS+1).upto(NUM_REFERRAL_AGENCIES+NUM_LANDLORDS) do |n|
    referral_agency = ReferralAgency.create(
      name: Faker::Name.name,
      email: "user#{n}@gmail.com",
      password: "password",
      password_confirmation: "password",
      phone: Faker::PhoneNumber.cell_phone.gsub(/-/, ''),
      address: Faker::Address.street_address
    )
    referral_agency.save
    printf("#{n-NUM_LANDLORDS}/#{NUM_REFERRAL_AGENCIES} Referral Agencies \r")
  end
  puts "\n"
end

def make_properties
  1.upto(NUM_PROPERTIES) do |n|
    property = Property.create(
      capacity: Faker::Number.between(1, 25),
      description: Faker::RickAndMorty.quote,
      landlord_id: Faker::Number.between(1, NUM_LANDLORDS),
      rent: Faker::Number.between(500, 3000),
      size: Faker::Number.between(500, 3000),
      housing_type: n%13,
      property_type: n%10,
      location: n%6,
      date_available: Date.today
    )
    property.save
    printf("#{n}/#{NUM_PROPERTIES} Properties \r")
  end
  puts "\n"
end

def make_tenants
  1.upto(NUM_TENTANTS) do |n|
    tenant = Tenant.create(
      name: Faker::Name.name,
    	description: Faker::HowIMetYourMother.quote,
    	email: "tenant#{n}@gmail.com",
    	phone: Faker::PhoneNumber.cell_phone.gsub(/-/, ''),
    	nino: Faker::IDNumber.valid,
    	rent_min: Faker::Number.between(500, 1000),
    	rent_max: Faker::Number.between(2000, 3000),
    	housing_type: n%13,
    	property_type: n%10,
    	location: n%6,
    	num_bedrooms: Faker::Number.number(1),
    	referral_agency_id: Faker::Number.between(NUM_LANDLORDS+1, NUM_REFERRAL_AGENCIES+NUM_LANDLORDS),
    	date_needed: Date.today
    )
    tenant.save
    Info.create(tenant_id: tenant.id)
    printf("#{n}/#{NUM_TENTANTS} Tenants \r")
  end
  puts "\n"
end

def make_applications
  0.upto(NUM_TENTANTS-10) do |n|
    application = Application.create(
      status: 1,
      property_id: n%5+1,
      info_id: n
    )
    application.save
    printf("#{n}/#{NUM_TENTANTS-10} Applications \r")
  end
  puts "\n"
end

make_landlords
make_referral_agencies
make_properties
make_tenants
make_applications
puts "Seeding Finished!"
