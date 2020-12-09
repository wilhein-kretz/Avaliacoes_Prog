from config import *
import os

class Agropecuaria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    endereco = db.Column(db.String(254))
    telefone = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.endereco + ", " + self.telefone

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "endereco": self.endereco,
            "telefone": self.telefone
        }
   
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    valor = db.Column(db.String(254))
    id_agropecuaria = db.Column(db.Integer, db.ForeignKey(Agropecuaria.id), nullable=False)
    agropecuaria = db.relationship("Agropecuaria")

    def __str__(self): 
        return f"{self.nome}, {self.valor}, " + \
            ", "+ str(self.agropecuaria)

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "valor": self.valor,
            "agropecuaria": self.agropecuaria.json()
        }

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    telefone = db.Column(db.String(254))
    id_agropecuaria = db.Column(db.Integer, db.ForeignKey(Agropecuaria.id), nullable=False)
    agropecuaria = db.relationship("Agropecuaria")

    def __str__(self): 
        return f"{self.nome}, {self.telefone}, " + \
            ", "+ str(self.agropecuaria)

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "telefone": self.telefone,
            "agropecuaria": self.agropecuaria.json()
        }

if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    a1 = Agropecuaria(nome = "Timbó Agro Aves", endereco = "Timbó - SC", 
        telefone = "47 4002-8922")      
    a2 = Agropecuaria(nome = "Agro Loucos", endereco = "Blumenau - SC", 
        telefone = "47 4002-8922")        
    
    p1 = Produto(nome = "Ração de cachorro", valor = "R$ 14,90", agropecuaria = a1)
    cli1 = Cliente(nome = "Carlitos", telefone = "47 3382-0000", agropecuaria = a2)

    db.session.add(a1)
    db.session.add(a2)
    db.session.add(p1)
    db.session.add(cli1)
    db.session.commit()
    
    print(a1)
    print(a2)
    print(p1)
    print(cli1)
    print(a1.json())
    print(cli1.json())