# frozen_string_literal: true

interest_categories = %w[
  Cars Pets Books Art Movies Serials Beauty Sport
  Active\ rest Video\ games Games
]
interest_categories.each do |interest_category|
  InterestCategory.create!(category_name: interest_category)
end

cars_interests = %w[
  Acura Audi BMW Cadillac Chrysler Citroen Dodge Fiat Ford
  Geely Honda Hyundai Infiniti Jaguar Jeep Kia Lexus Mazda
  Mercedes-Benz Mitsubishi Nissan Opel Peugeot Porsche Renault
  Saab SEAT Skoda Subaru Toyota Volkswagen Volvo
]
cars_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Cars').interests.create!(name: interest)
end

pets_interests = %w[
  Dogs Cats Horses Fishes Mini\ pigs Spiders Hamsters Rabbits
  Parrots Reptiles
]
pets_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Pets').interests.create!(name: interest)
end

beauty_interests = %w[
  Fantasy Adventure Romance Contemporary Dystopian Mystery Horror
  Thriller Paranormal Historical Science Fiction Memoir Cooking
  Art Development Motivational Health History Travel
  Families\ &\ Relationships Humor Children’s
]
beauty_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Books').interests.create!(name: interest)
end

arts_interests = %w[
  Abstract\ Expressionism Art\ Deco Art\ Nouveau Avant-garde Baroque Bauhaus
  Classicism Conceptual\ Art Constructivism Cubism Dada\ /\ Dadaism Expressionism
  Fauvism Futurism Impressionism Installation\ Art Land\ Art Minimalism
  Neo-Impressionism Neoclassicism Performance\ Art Pop\ Art Post-Impressionism
  Precisionism Rococo Surrealism Suprematism Symbolism
]
arts_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Art').interests.create!(name: interest)
end

films_interests = %w[
  Action Comedy Drama Fantasy Horror Mystery Romance Thriller
  Western Sport
]
films_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Movies').interests.create!(name: interest)
end

serials_interests = %w[
  Drama History Thriller Detective Action Comedy Crime Melodrama
  Adventure Sport Horror Fantasy Mystery
]
serials_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Serials').interests.create!(name: interest)
end

beauty_interests = %w[
  Make\ up Skin\ care Fashion Style Hairstyle Hair\ care Nails Fitness
  Proper\ nutrition
]
beauty_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Beauty').interests.create!(name: interest)
end

sport_interests = %w[
  Tennis Volleyball Basketball Baseball Criket Skateboarding Frisbee
  Climbing Cycling Boxing Football Golf Gymnastic Running Skiing Hockey Lacrosse Polo Rafting Racing Quidditch
]
sport_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Sport').interests.create!(name: interest)
end

active_rest_interests = %w[
  Rafting Surfing Diving Water\ skiing Swimming Skiing Skating Snowboarding
  Skydiving Paragliding Cycling Mountain\ Bike Carting Horseback\ riding
]
active_rest_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Active rest').interests.create!(name: interest)
end

video_games_interests = %w[
  Action Adventure Role-playing Simulation Strategy Sports Puzzle Idle
  On-line Casual Shooter Fighting Escape
]
video_games_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Video games').interests.create!(name: interest)
end

games_interests = %w[
  Board\ games Card\ games Dice\ games Pencil-and-paper\ games Singing\ games Eurogames
  Tile-based\ games Pong Drinking\ games
]
games_interests.each do |interest|
  InterestCategory.find_by(category_name: 'Games').interests.create!(name: interest)
end
