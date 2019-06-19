module Recommendation
	
	# tenant_features: utilities and furniture are missing from tenants schema
	TENANT_PROPERTY_FEATURES = ["mobility_aids",
															"accessible_shower",
															"car_parking", 
															"lift_access"]	

	def recommend_properties(properties)
		
		# filter for properties in same location of user interest
		#properties = generate_candidates(properties)	
	
		recommended = Hash.new(0)

		user_features =  self.attributes.slice(*TENANT_PROPERTY_FEATURES)
											.values
											.map{|x| if x then x= 1 else x= 0 end }
		user_preferred_location = Geolocator.get_coord(self.location)	 
		properties.each do |property|

			property_features =  property.attributes.slice(*TENANT_PROPERTY_FEATURES)
											.values
											.map{|x| if x then x=1 else x= 0 end }
	
			score = dot_product( u=property_features, v=user_features ) +
					Math.exp( -
					user_preferred_location.distance_to(Geolocator.get_coord(property.location))
					)
			
			recommended[property] = score
		end

		sorted_properties_score = recommended.sort_by {|key,value| value}.reverse!
		sorted_properties = []
		sorted_properties_score.each do |key,value|
			sorted_properties << key
		end
	
		return sorted_properties
	end


	class Geolocator < Geokit::Geocoders::MapQuestGeocoder

		@@default_units = :miles # others :kms, :nms, :meters
		@@default_formula = :sphere
		@@request_timeout = 20
		@@key = 
		
		# maybe there is no need to write this method?
		def self.get_coord(address)
			return geocode(address.capitalize, :bias => 'uk')
		end
	end

	def dot_product(u,v)
		sum = 0
		u.each_index do |i|
			sum += u[i] * v[i]
		end
		return sum
	end

	def generate_candidates(properties)		
		return properties.select { |e| e[:location] ==  self.location }
	end	

end
