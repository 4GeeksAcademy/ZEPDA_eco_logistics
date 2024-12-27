from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Modelo user
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    rol = db.Column(db.String(80), nullable=False)
    suscription_at = db.Column(db.Date, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    
    # Relaciones
    companies = db.relationship('Company', backref='user_company')
    favorites = db.relationship('Favorites', back_populates='user')
    hirings = db.relationship('Hirings', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rol": self.rol,
            "suscription_at": self.suscription_at,
            "phone": self.phone,
        }

# Modelo company
class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    nif = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    web = db.Column(db.String(120), unique=True, nullable=True)
    certificate = db.Column(db.String(120), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)

    favorites = db.relationship('Favorites', back_populates='company')
    def __repr__(self):
        return f'<Company {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "nif": self.nif,
            "name": self.name,
            "email": self.email,
            "description": self.description,
            "web": self.web,
            "certificate": self.certificate,
        }

# Modelo Favoritos
class Favorites(db.Model):
    __tablename__ = 'favorites'
    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False) 

     # Relaciones con User y Company
    user = db.relationship('User', back_populates='favorites')
    company = db.relationship('Company', back_populates='favorites')

    def __repr__(self):
        return f'<Favorite {self.user_id} - {self.company_id}>'

# Modelo para las valoraciones de los servicios (Ratings)
class Ratings(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    hiring_id = db.Column(db.Integer, db.ForeignKey('hirings.id'), nullable=False)
    comment = db.Column(db.Text, nullable=True)
    score = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Rating {self.score}>'

    def serialize(self):
        return {
            "id": self.id,
            "hiring_id": self.hiring_id,
            "comment": self.comment,
            "score": self.score,
            "date": self.date,
        }

# Modelo para los servicios ofrecidos por las compañías (TypeService)
class TypeService(db.Model):
    __tablename__ = 'type_services'
    type_service_id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    sector = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<TypeService {self.sector}>'

    def serialize(self):
        return {
            "type_service_id": self.type_service_id,
            "company_id": self.company_id,
            "sector": self.sector,
            "description": self.description,
        }

# Modelo para las contrataciones (Hirings)
class Hirings(db.Model):
    __tablename__ = 'hirings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type_service_id = db.Column(db.Integer, db.ForeignKey('type_services.type_service_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)

    user = db.relationship('User', back_populates='hirings')
    type_service = db.relationship('TypeService', backref='hirings')

    def __repr__(self):
        return f'<Hiring {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type_service_id": self.type_service_id,
            "date": self.date,
        }