from config import *
from modelo import Agropecuaria, Cliente, Produto

@app.route('/agropecuarias', methods=['get'])
def agropecuarias():
    db_agropecuarias = db.session.query(Agropecuaria).all()
    json_agropecuarias = [ agropecuaria.json() for agropecuaria in db_agropecuarias ]
    response = jsonify(json_agropecuarias)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/criar_agropecuaria', methods=['post'])
def criar_agropecuaria():
    response = jsonify({"status": "201", "result": "ok", "details": "Agropecuária Criada!"})
    data = request.get_json()
    try:
        novo = Agropecuaria(**data)
        db.session.add(novo)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 

@app.route('/deletar_agropecuaria/<int:id>', methods=['DELETE'] )
def deletar_agropecuaria(id):
    response = jsonify({"status": "200", "result": "ok", "details": "Agropecuária deleted"})
    try:
        Agropecuaria.query.filter(Agropecuaria.id == id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "400" , "result": "error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/listar_clientes")
def listar_clientes():
    clientes_cadastrados = db.session.query(Cliente).all()
    lista_jsons = [ x.json() for x in clientes_cadastrados ]
    response = jsonify(lista_jsons)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/listar_produtos")
def listar_produtos():
    produtos_cadastrados = db.session.query(Produto).all()
    lista_jsons = [ x.json() for x in produtos_cadastrados ]
    response = jsonify(lista_jsons)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True)