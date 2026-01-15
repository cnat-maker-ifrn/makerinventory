import { NavLink } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

export default function Manual() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1A955E]">Manual do Inventário Maker</h1>
          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-[#1A955E] border-2 border-[#1A955E] rounded-lg hover:bg-[#1A955E] hover:text-white transition-colors"
          >
            <MdArrowBack size={20} />
            Voltar
          </NavLink>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Índice */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Conteúdo</h2>
              <nav className="space-y-2 text-sm">
                <button
                  onClick={() => scrollToSection("categoria")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  1. Categoria
                </button>
                <button
                  onClick={() => scrollToSection("subcategoria")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  2. Subcategoria
                </button>
                <button
                  onClick={() => scrollToSection("produto")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  3. Produto
                </button>
                <button
                  onClick={() => scrollToSection("item")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  4. Item
                </button>
                <button
                  onClick={() => scrollToSection("lote")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  5. Lote
                </button>
                <button
                  onClick={() => scrollToSection("movimentacao")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  6. Movimentações
                </button>
                <button
                  onClick={() => scrollToSection("saida")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  7. Saídas
                </button>
                <button
                  onClick={() => scrollToSection("emprestimo")}
                  className="block w-full text-left px-3 py-2 text-[#1A955E] hover:bg-gray-100 rounded transition-colors"
                >
                  8. Empréstimos
                </button>
              </nav>
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <main className="lg:col-span-3 space-y-8">
            {/* Categoria */}
            <section id="categoria" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">1. Categoria</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Categoria?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Categoria</strong> é a classificação mais geral e abrangente para organizar seus produtos no inventário. 
                    Serve como o primeiro nível de organização, agrupando tipos principais de itens. Por exemplo: 
                    <strong> Impressoras 3D, Filamentos, Materiais, Ferramentas, Eletrônicos</strong>, etc.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar uma Categoria?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Procure pela opção de cadastro de categorias (geralmente no menu de administração)</li>
                    <li>Clique no botão <strong>Adicionar Nova Categoria</strong></li>
                    <li>Preencha o nome da categoria (ex: "Filamentos")</li>
                    <li>Opcionalmente, adicione uma descrição</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Mantenha suas categorias simples e bem definidas. 
                    Use categorias amplas que você possa subdividir em subcategorias mais específicas.
                  </p>
                </div>
              </div>
            </section>

            {/* Subcategoria */}
            <section id="subcategoria" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">2. Subcategoria</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Subcategoria?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Subcategoria</strong> é um nível mais específico de classificação que fica dentro de uma Categoria. 
                    Enquanto a categoria é ampla, a subcategoria divide aquela categoria em tipos mais específicos. 
                    Por exemplo, dentro da categoria <strong>"Filamentos"</strong>, você pode ter subcategorias como 
                    <strong> PLA, ABS, PETG, TPU</strong>, etc.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar uma Subcategoria?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Procure pela opção de cadastro de subcategorias</li>
                    <li>Clique no botão <strong>Adicionar Nova Subcategoria</strong></li>
                    <li>Selecione a <strong>Categoria</strong> pai (ex: "Filamentos")</li>
                    <li>Preencha o nome da subcategoria (ex: "PLA")</li>
                    <li>Opcionalmente, adicione uma descrição</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Sempre crie uma subcategoria dentro de uma categoria. 
                    Você não pode criar um produto diretamente em uma categoria sem uma subcategoria.
                  </p>
                </div>
              </div>
            </section>

            {/* Produto */}
            <section id="produto" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">3. Produto</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é um Produto?</h3>
                  <p className="leading-relaxed">
                    Um <strong>Produto</strong> é a representação de um item específico que você comercializa ou utiliza. 
                    Está vinculado a uma subcategoria e define o tipo exato do que você está gerenciando. 
                    Por exemplo, dentro da subcategoria "PLA", você pode ter produtos como 
                    <strong> "Filamento PLA Vermelho 1kg", "Filamento PLA Azul 500g"</strong>, etc.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar um Produto?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique no botão <strong>Adicionar Novo Produto</strong></li>
                    <li>Preencha o <strong>Nome do Produto</strong> (ex: "Filamento PLA Vermelho 1kg")</li>
                    <li>Selecione a <strong>Categoria</strong> e depois a <strong>Subcategoria</strong></li>
                    <li>Adicione o <strong>SKU</strong> (código identificador único, opcional)</li>
                    <li>Preencha outras informações relevantes (descrição, preço de custo, etc)</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Um produto é apenas a definição do que você está controlando. 
                    O estoque real é controlado através de <strong>Itens</strong> e <strong>Lotes</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Item */}
            <section id="item" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">4. Item</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é um Item?</h3>
                  <p className="leading-relaxed">
                    Um <strong>Item</strong> é uma unidade individual de um Produto no seu inventário. 
                    Cada item possui um <strong>número de série único</strong> (UUID) que o identifica especificamente. 
                    Itens são usados para rastrear produtos de forma individualizada, especialmente útil para 
                    produtos com alto valor ou que precisam de rastreamento específico. Por exemplo, 
                    se você tem um produto "Impressora 3D Modelo X", cada impressora física é um Item diferente.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tipos de Produtos e Itens</h3>
                  <div className="space-y-3 ml-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Produto Unitário:</strong> Cada unidade é um Item separado (ex: Impressoras, Computadores)</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Produto em Lote:</strong> Agrupado em lotes, não tem itens individuais (ex: Filamentos vendidos em rolos)</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Produto Baixo Estoque:</strong> Usado para materiais que precisam alertar quando acabam (ex: Tinta, Papel)</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Produto Fracionado:</strong> Pode ser dividido em quantidades menores (ex: Serviços de impressão)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar um Item?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique em <strong>Itens</strong> no submenu</li>
                    <li>Clique no botão <strong>Adicionar Novo Item</strong></li>
                    <li>Selecione o <strong>Produto</strong> ao qual o item pertence</li>
                    <li>O sistema gerará automaticamente um <strong>UUID único</strong> para o item</li>
                    <li>Adicione informações como data de entrada, localização, etc</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Itens são para produtos de alto valor que você quer rastrear individualmente. 
                    Para produtos em grande quantidade (como filamentos), use Lotes em vez de Itens.
                  </p>
                </div>
              </div>
            </section>

            {/* Lote */}
            <section id="lote" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">5. Lote</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é um Lote?</h3>
                  <p className="leading-relaxed">
                    Um <strong>Lote</strong> é uma agrupação de múltiplas unidades de um Produto que são gerenciadas juntas. 
                    Ao contrário de Itens (que são individuais), Lotes permitem que você controle quantidades sem rastrear 
                    cada unidade separadamente. Por exemplo, se você recebe 100 rolos de filamento, você cria um Lote com 100 unidades 
                    em vez de criar 100 Itens diferentes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Características de um Lote</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Número do Lote:</strong> Identificador único do lote (ex: "LOTE-2024-001")</li>
                    <li><strong>Quantidade:</strong> Número total de unidades no lote</li>
                    <li><strong>Data de Entrada:</strong> Quando o lote foi recebido</li>
                    <li><strong>Data de Validade:</strong> Quando o lote vence (se aplicável)</li>
                    <li><strong>Fornecedor:</strong> De quem foi adquirido o lote</li>
                    <li><strong>Custo Unitário:</strong> Preço de cada unidade no lote</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar um Lote?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique em <strong>Lotes</strong> no submenu</li>
                    <li>Clique no botão <strong>Adicionar Novo Lote</strong></li>
                    <li>Selecione o <strong>Produto</strong> do lote</li>
                    <li>Preencha o <strong>Número do Lote</strong></li>
                    <li>Insira a <strong>Quantidade</strong> de unidades</li>
                    <li>Preencha a <strong>Data de Entrada</strong></li>
                    <li>Se aplicável, adicione a <strong>Data de Validade</strong></li>
                    <li>Selecione ou adicione o <strong>Fornecedor</strong></li>
                    <li>Preencha o <strong>Custo Unitário</strong></li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Use Lotes para produtos com grande volume e uso frequente. 
                    O sistema automaticamente reduz a quantidade do lote quando há saídas ou empréstimos.
                  </p>
                </div>
              </div>
            </section>

            {/* Movimentação */}
            <section id="movimentacao" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">6. Movimentações</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Movimentação?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Movimentação</strong> é um registro de transferência de produtos entre locais diferentes 
                    no seu inventário. Serve para rastrear quando um produto é movido de um local para outro, 
                    sem que ele saia do seu controle. Por exemplo, mover filamento da estante A para a estante B, 
                    ou transferir uma impressora de um departamento para outro.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tipos de Movimentações</h3>
                  <div className="space-y-3 ml-4">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Transferência Entre Locais:</strong> Move um item/lote de um local para outro</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Ajuste de Estoque:</strong> Corrige quantidade devido a perdas, danos ou discrepâncias</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Consolidação:</strong> Agrupa múltiplos lotes ou itens em um só lugar</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Criar uma Movimentação?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Movimentações</strong></li>
                    <li>Clique no botão <strong>Adicionar Nova Movimentação</strong></li>
                    <li>Selecione o <strong>Tipo de Movimentação</strong></li>
                    <li>Escolha o <strong>Produto</strong>, <strong>Item</strong> ou <strong>Lote</strong> a mover</li>
                    <li>Selecione o <strong>Local de Origem</strong> e <strong>Local de Destino</strong></li>
                    <li>Insira a <strong>Quantidade</strong> (para lotes fracionados)</li>
                    <li>Adicione uma <strong>Observação</strong> se necessário</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Movimentações são importantes para rastrear a localização física de seus produtos. 
                    Sempre registre uma movimentação quando mudar um item de lugar para manter o histórico atualizado.
                  </p>
                </div>
              </div>
            </section>

            {/* Saída */}
            <section id="saida" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">7. Saídas</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Saída?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Saída</strong> é um registro de quando um produto permanentemente deixa seu inventário. 
                    Diferente de uma Movimentação (que apenas muda de local) ou de um Empréstimo (que deve retornar), 
                    uma saída é definitiva. Por exemplo: venda de um produto, consumo interno de material, ou descarte de itens danificados.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tipos de Saída</h3>
                  <div className="space-y-3 ml-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <p><strong>Venda:</strong> Produto vendido a um cliente</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <p><strong>Consumo Interno:</strong> Produto usado internamente (ex: filamento usado em impressão interna)</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <p><strong>Descarte:</strong> Produto danificado ou obsoleto que foi removido</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <p><strong>Doação:</strong> Produto doado para terceiros</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Registrar uma Saída?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Saídas</strong></li>
                    <li>Clique no botão <strong>Adicionar Nova Saída</strong></li>
                    <li>Selecione o <strong>Tipo de Saída</strong> (Venda, Consumo, Descarte, etc)</li>
                    <li>Escolha o <strong>Produto</strong>, <strong>Item</strong> ou <strong>Lote</strong></li>
                    <li>Insira a <strong>Quantidade</strong> que está saindo</li>
                    <li>Preencha a <strong>Data de Saída</strong></li>
                    <li>Se for venda, você pode adicionar informações do <strong>Cliente</strong> ou <strong>Nota Fiscal</strong></li>
                    <li>Adicione uma <strong>Observação</strong> se necessário</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                  <p className="text-sm text-red-900">
                    <strong>⚠️ Importante:</strong> Saídas são permanentes. O estoque será reduzido imediatamente. 
                    Se você quer registrar uma retirada temporária, use um Empréstimo em vez de uma Saída.
                  </p>
                </div>
              </div>
            </section>

            {/* Empréstimo */}
            <section id="emprestimo" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">8. Empréstimos</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é um Empréstimo?</h3>
                  <p className="leading-relaxed">
                    Um <strong>Empréstimo</strong> é um registro de quando um produto é temporariamente retirado do inventário 
                    com a intenção de ser devolvido. Diferente de uma Saída (que é permanente), um empréstimo rastreia 
                    quando o item saiu e quando deve retornar. Por exemplo: emprestar uma ferramenta para um cliente, 
                    ceder uma máquina para teste, ou retirar equipamento para conserto.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Estados de um Empréstimo</h3>
                  <div className="space-y-3 ml-4">
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p><strong>Ativo:</strong> O item foi emprestado e ainda não retornou</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p><strong>Devolvido:</strong> O item foi emprestado e retornou ao inventário</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p><strong>Pendente:</strong> O prazo de devolução passou e o item ainda não retornou</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Criar um Empréstimo?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Empréstimos</strong></li>
                    <li>Clique no botão <strong>Adicionar Novo Empréstimo</strong></li>
                    <li>Escolha o <strong>Produto</strong>, <strong>Item</strong> ou <strong>Lote</strong> a emprestar</li>
                    <li>Insira a <strong>Quantidade</strong> (para lotes fracionados)</li>
                    <li>Preencha o <strong>Solicitante</strong> (pessoa ou departamento que solicitou)</li>
                    <li>Adicione a <strong>Data de Empréstimo</strong></li>
                    <li>Defina a <strong>Data Prevista de Devolução</strong></li>
                    <li>Adicione uma <strong>Observação</strong> ou <strong>Motivo</strong></li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Registrar uma Devolução?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu <strong>Empréstimos</strong></li>
                    <li>Procure pelo empréstimo que está sendo devolvido (status "Ativo")</li>
                    <li>Clique em <strong>Registrar Devolução</strong></li>
                    <li>Verifique a <strong>Quantidade</strong> retornada</li>
                    <li>Preencha a <strong>Data de Devolução</strong></li>
                    <li>Adicione observações sobre o estado do item (se danificado, etc)</li>
                    <li>Clique em <strong>Confirmar Devolução</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> O sistema avisa quando um empréstimo está vencido (passou da data de devolução). 
                    Você pode configurar notificações para ser avisado sobre devoluções pendentes.
                  </p>
                </div>
              </div>
            </section>

            {/* Resumo */}
            <section className="bg-green-50 rounded-lg shadow-md p-8 border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-green-700 mb-4">📋 Resumo da Hierarquia</h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">A estrutura do inventário segue esta hierarquia:</p>
                
                <div className="bg-white p-4 rounded border border-green-200 font-mono text-sm">
                  <div>Categoria (ex: "Filamentos")</div>
                  <div className="ml-4">└─ Subcategoria (ex: "PLA")</div>
                  <div className="ml-8">└─ Produto (ex: "Filamento PLA Vermelho 1kg")</div>
                  <div className="ml-12">└─ Item ou Lote</div>
                  <div className="ml-16">└─ Movimentação / Saída / Empréstimo</div>
                </div>

                <p className="mt-4">
                  <strong>Resumo das operações:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Movimentação:</strong> Transfere entre locais (item continua seu)</li>
                  <li><strong>Saída:</strong> Remove permanentemente do inventário</li>
                  <li><strong>Empréstimo:</strong> Remove temporariamente com data de retorno</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
