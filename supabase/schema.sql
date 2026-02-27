-- Restro CG04 - Supabase Database Schema
-- Run this in your Supabase project's SQL Editor

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('starters', 'mains', 'breads', 'rice', 'desserts', 'beverages')),
  image_url TEXT,
  is_veg BOOLEAN DEFAULT true,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 20),
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Public read access for menu items
CREATE POLICY "Allow public read on menu_items"
  ON menu_items FOR SELECT
  USING (is_available = true);

-- Public read access for reviews
CREATE POLICY "Allow public read on reviews"
  ON reviews FOR SELECT
  USING (true);

-- Allow anyone to insert reviews
CREATE POLICY "Allow public insert on reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Allow anyone to insert reservations
CREATE POLICY "Allow public insert on reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- Seed Menu Data
INSERT INTO menu_items (name, description, price, category, is_veg) VALUES
-- Starters
('Veg Spring Rolls', 'Crispy rolls stuffed with seasoned vegetables', 180, 'starters', true),
('Paneer Tikka', 'Marinated cottage cheese cubes grilled in tandoor', 260, 'starters', true),
('Chicken Seekh Kebab', 'Minced chicken kebabs with aromatic spices', 320, 'starters', false),
('Mushroom 65', 'South-Indian style spicy mushroom fritters', 220, 'starters', true),
('Fish Amritsari', 'Crispy fried fish in Amritsari batter', 350, 'starters', false),
-- Mains
('Dal Makhani', 'Slow-cooked black lentils in rich tomato cream sauce', 280, 'mains', true),
('Butter Chicken', 'Tender chicken in velvety tomato-butter gravy', 380, 'mains', false),
('Shahi Paneer', 'Cottage cheese in rich cashew and cream sauce', 300, 'mains', true),
('Mutton Rogan Josh', 'Slow-braised mutton in Kashmiri spices', 480, 'mains', false),
('Palak Corn', 'Creamed spinach with sweet corn', 250, 'mains', true),
-- Breads
('Butter Naan', 'Soft leavened bread baked in tandoor', 60, 'breads', true),
('Laccha Paratha', 'Flaky layered whole wheat bread', 70, 'breads', true),
('Garlic Naan', 'Naan topped with fresh garlic and butter', 80, 'breads', true),
-- Rice
('Biryani Veg', 'Aromatic basmati rice with seasonal vegetables and saffron', 280, 'rice', true),
('Chicken Biryani', 'Layered basmati rice with tender chicken in dum style', 380, 'rice', false),
('Steamed Basmati Rice', 'Plain long-grain basmati rice', 100, 'rice', true),
-- Desserts
('Gulab Jamun', 'Soft milk-solid dumplings in rose sugar syrup', 120, 'desserts', true),
('Kulfi Falooda', 'Traditional Indian ice cream with falooda noodles', 160, 'desserts', true),
('Phirni', 'Chilled rice pudding topped with pistachios', 140, 'desserts', true),
-- Beverages
('Masala Chai', 'Spiced Indian tea with milk', 60, 'beverages', true),
('Mango Lassi', 'Chilled yogurt drink with Alphonso mango', 120, 'beverages', true),
('Fresh Lime Soda', 'Refreshing lime water with soda', 80, 'beverages', true),
('Jaljeera', 'Traditional Indian tangy spiced water', 70, 'beverages', true);

-- Seed Review Data
INSERT INTO reviews (author_name, rating, comment) VALUES
('Priya Sharma', 5, 'Absolutely stunning lakeside view! The Paneer Tikka was melt-in-your-mouth perfect and the ambience was magical during sunset. Will definitely visit again.'),
('Rahul Mehta', 4, 'Great place for a family dinner. The Chicken Biryani was fragrant and perfectly cooked. Service was warm and attentive. Highly recommended!'),
('Ananya Patel', 5, 'Came here for our anniversary dinner and the staff made it extra special. The Mutton Rogan Josh was phenomenal — rich, aromatic, and tender.'),
('Vikram Singh', 4, 'The lakeside setting is a real treat. Food quality is consistently good. Dal Makhani and Garlic Naan combo is a must-try!'),
('Deepika Nair', 3, 'Good food and lovely ambience but the service was a bit slow on busy weekends. The Kulfi Falooda made up for it though!'),
('Arjun Gupta', 5, 'Best fine dining experience in Naya Raipur! Every dish was an explosion of flavors. The lakeside location with gentle breeze was just perfect.');
