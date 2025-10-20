-- Insert sample admin user (password: admin123 - should be hashed in production)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@shelter.com', 'admin123', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample animals
INSERT INTO animals (name, species, breed, age, gender, size, description, medical_notes, status, image_url) VALUES
('Max', 'Dog', 'Golden Retriever', 3, 'Male', 'Large', 'Max is a friendly and energetic golden retriever who loves to play fetch and go on long walks. He is great with kids and other dogs.', 'Up to date on all vaccinations. Neutered.', 'available', '/placeholder.svg?height=400&width=400'),
('Luna', 'Cat', 'Siamese', 2, 'Female', 'Small', 'Luna is a gentle and affectionate cat who enjoys quiet environments. She loves to cuddle and purr on your lap.', 'Spayed. Indoor cat only.', 'available', '/placeholder.svg?height=400&width=400'),
('Charlie', 'Dog', 'Labrador Mix', 5, 'Male', 'Large', 'Charlie is a loyal companion who has been with us for a while. He is calm, well-trained, and perfect for a family.', 'Neutered. Requires regular exercise.', 'available', '/placeholder.svg?height=400&width=400'),
('Bella', 'Cat', 'Tabby', 1, 'Female', 'Small', 'Bella is a playful kitten full of energy. She loves toys and exploring new places.', 'All vaccinations current. Spayed.', 'available', '/placeholder.svg?height=400&width=400'),
('Rocky', 'Dog', 'German Shepherd', 4, 'Male', 'Large', 'Rocky is a protective and intelligent dog. He would do best in a home with experienced dog owners.', 'Neutered. Requires training and socialization.', 'fostered', '/placeholder.svg?height=400&width=400'),
('Whiskers', 'Cat', 'Persian', 6, 'Male', 'Medium', 'Whiskers is a senior cat looking for a quiet retirement home. He is very calm and loves to nap in sunny spots.', 'Senior care needed. Regular vet checkups.', 'available', '/placeholder.svg?height=400&width=400'),
('Daisy', 'Dog', 'Beagle', 2, 'Female', 'Medium', 'Daisy is an adventurous beagle with a great nose! She loves exploring and would be perfect for an active family.', 'Spayed. Up to date on vaccinations.', 'available', '/placeholder.svg?height=400&width=400'),
('Mittens', 'Cat', 'Calico', 3, 'Female', 'Small', 'Mittens is a sweet and independent cat. She enjoys both playtime and relaxation.', 'Spayed. Good with other cats.', 'adopted', '/placeholder.svg?height=400&width=400')
ON CONFLICT DO NOTHING;
