# tenant's recommendation functionality 
# suggestion for optimising: only pass in property id rather than full object
module Recommendation
	def recommend_properties(properties)
		# instantiate properties score with zero 
		recommended = Hash.new(0)

		properties.each do |property|
			score = (property.rent - self.rent_min) +  # -> .W (weights for each feature) -> not || because lower rent pros
							 (property.capacity - self.number_of_bedrooms).abs
			recommended[property] += score
		end

		sorted_properties_score = recommended.sort_by {|key,value| value}
		sorted_properties = []

		sorted_properties_score.each do |key,value|
			sorted_properties << key
		end
	
		return sorted_properties
	end
end

