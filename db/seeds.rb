# frozen_string_literal: true

# Constants

# Please set the following to at LEAST 10
NUM_LANDLORDS = 10
NUM_REFERRAL_AGENCIES = 10

# Please set the following to a multiple of 3. RECOMMENDED: 30 for both
NUM_PROPERTIES = 30
NUM_TENTANTS = 30

def make_landlords
  1.upto(NUM_LANDLORDS) do |n|
    landlord = Landlord.create(
      name: Faker::Name.name,
      email: "user#{n}@gmail.com",
      password: 'password',
      password_confirmation: 'password',
      phone: Faker::PhoneNumber.cell_phone.delete('-'),
      address: Faker::Address.street_address
    )
    landlord.save
    # landlord.primary_email_record.skip_confirmation!
    landlord.primary_email_record.save!
    printf("#{n}/#{NUM_LANDLORDS} Landlords \r")
  end
  puts "\n"
end

def make_referral_agencies
  (NUM_LANDLORDS + 1).upto(NUM_REFERRAL_AGENCIES + NUM_LANDLORDS) do |n|
    referral_agency = ReferralAgency.create(
      name: Faker::Name.name,
      email: "user#{n}@gmail.com",
      password: 'password',
      password_confirmation: 'password',
      phone: Faker::PhoneNumber.cell_phone.delete('-'),
      address: Faker::Address.street_address
    )
    referral_agency.save
    # referral_agency.primary_email_record.skip_confirmation!
    referral_agency.primary_email_record.save!
    printf("#{n - NUM_LANDLORDS}/#{NUM_REFERRAL_AGENCIES} Referral Agencies \r")
  end
  puts "\n"
end

def make_properties
  1.upto(NUM_PROPERTIES) do |n|
    property = Property.create(
      capacity: Faker::Number.between(1, 25),
      description: Faker::HowIMetYourMother.quote,
      landlord_id: Faker::Number.between(1, NUM_LANDLORDS),
      rent: Faker::Number.between(500, 3000),
      size: Faker::Number.between(500, 3000),
      housing_type: n % 13,
      property_type: n % 10,
      location: n % 6,
      date_available: Date.today
    )
    property.images.attach(io: File.open('app/assets/images/house1.png'), filename: 'house1.png')
    property.images.attach(io: File.open('app/assets/images/house2.png'), filename: 'house2.png')
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
      phone: Faker::PhoneNumber.cell_phone.delete('-'),
      rent_min: Faker::Number.between(500, 1000),
      rent_max: Faker::Number.between(2000, 3000),
      housing_type: n % 13,
      property_type: n % 10,
      location: n % 6,
      num_bedrooms: Faker::Number.number(1),
      referral_agency_id: Faker::Number.between(NUM_LANDLORDS + 1, NUM_REFERRAL_AGENCIES + NUM_LANDLORDS),
      date_needed: Date.today
    )
    tenant.avatar.attach(io: File.open('app/assets/images/avatar.jpg'), filename: 'avatar.jpg')
    tenant.save
    Info.create(tenant_id: tenant.id)
    printf("#{n}/#{NUM_TENTANTS} Tenants \r")
  end
  puts "\n"
end

# Assuming NUM is 30...

# creates applications for 20 tenants. There should be 10 tenants and 15 properties without apps.
def make_applications
  make_received_apps
  make_rejected_apps
  make_special_apps(NUM_TENTANTS / 3 + 1, NUM_TENTANTS / 3 + 5, 2, 'Interview')
  make_special_apps(NUM_TENTANTS / 3 + 6, NUM_TENTANTS / 3 + 10, 3, 'Housed')
end

# Makes 10 apps with status received for users 1-10. These apps are distributed
# amongst properties 1-5.
def make_received_apps
  1.upto(NUM_TENTANTS / 3) do |n|
    application = Application.create(
      status: 1,
      property_id: n % 5 + 1,
      info_id: n,
      description: 'received description'
    )
    application.save
    printf("#{n}/10 Received Applications \r")
  end
  puts "\n"
end

# Makes 5 apps with status rejected for users 1-5. These apps are distributed
# amongst properties 1-5.
def make_rejected_apps
  1.upto(5) do |n|
    application = Application.create(
      status: 0,
      property_id: n % 5 + 2,
      info_id: n,
      description: 'rejected description'
    )
    application.save
    printf("#{n}/5 Rejected Applications \r")
  end
  puts "\n"
end

# Makes 25 apps (5 'interview/housed' and 20 'received' apps). 5 tenants, 5 houses
# Each tenant will have 4 'received' apps and 1 'interview/housed' app.
def make_special_apps(start, fin, stat_num, custom)
  special_num = 0
  received = 0
  new_stat = 1
  count = fin - 5
  start.upto(fin) do |n|
    (start - 5).upto(fin - 5) do |p|
      if p == count
        new_stat = stat_num
        count -= 1
        special_num += 1
      else
        received += 1
      end
      application = Application.create(
        status: new_stat,
        property_id: p,
        info_id: n,
        description: 'special description'
      )
      application.save
      new_stat = 1
      printf("#{special_num}/5 #{custom} Applications, #{received}/20 Received Applications \r")
    end
  end
  puts "\n"
end

make_landlords
make_referral_agencies
make_properties
make_tenants
make_applications
puts 'Seeding Finished!'
