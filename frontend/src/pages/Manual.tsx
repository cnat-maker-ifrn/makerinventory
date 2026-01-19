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
            <section id="categoria" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">1. Categoria</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Categoria?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Categoria</strong> é a classificação mais geral e abrangente para organizar seus produtos no inventário.
                    Serve como o primeiro nível de organização, agrupando tipos principais de itens. Por exemplo:
                    <strong> Consumíveis, Móveis, Ferramentas, Eletrônicos</strong>, etc.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar uma Categoria?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique no botão <strong>+ Nova Categoria</strong></li>
                    <li>Preencha o nome da categoria (ex: "Eletrônicos")</li>
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
            <section id="subcategoria" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">2. Subcategoria</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Subcategoria?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Subcategoria</strong> é um nível mais específico de classificação que fica dentro de uma Categoria.
                    Enquanto a categoria é ampla, a subcategoria divide aquela categoria em tipos mais específicos.
                    Por exemplo, dentro da categoria <strong>"Consumíveis"</strong>, você pode ter subcategorias como
                    <strong> Filamentos, Resinas, MDF</strong>, etc.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar uma Subcategoria?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique no botão <strong>+ Nova Subcategoria</strong></li>
                    <li>Selecione a <strong>Categoria</strong> principal (ex: "Consumíveis")</li>
                    <li>Preencha o nome da subcategoria (ex: "Filamentos")</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠ Obs.:</strong> Sempre crie uma subcategoria dentro de uma categoria.
                    Você não pode criar um produto diretamente em uma categoria sem uma subcategoria.
                  </p>
                </div>
              </div>
            </section>

            {/* Produto */}
            <section id="produto" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">3. Produto</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é um Produto?</h3>
                  <p className="leading-relaxed">
                    Um <strong>Produto</strong> é a representação de um item específico que você comercializa ou utiliza.
                    Está vinculado a uma subcategoria e define o tipo exato do que você está gerenciando.
                    Por exemplo, dentro da subcategoria "Filamentos", você pode ter produtos como
                    <strong> "Filamento PLA Vermelho 1kg", "Filamento PLA Azul 1kg"</strong>, etc.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tipos de Produtos</h3>
                  <div className="space-y-3 ml-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Produto Unitário:</strong> São vendidos em unidade (ex: Impressoras, Desktops e Notebooks)</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Produto Fracionado:</strong> São vendidos em quantidade(ex: Filamento PLA e Filamentos ABS)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar um Produto?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique no botão <strong>+ Novo Produto</strong></li>
                    <li>Selecione o <strong>Tipo do Produto</strong></li>
                    <li>Preencha o <strong>Nome do Produto</strong> (ex: "Filamento PLA Vermelho 1kg")</li>
                    <li>Selecione a <strong>Subcategoria</strong></li>
                    <li>Adicone a <strong>Quantidade Mínima</strong>(Diz o mínimo que deve ter do produto no laboratório)</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠ Obs.:</strong> Um produto é apenas a definição do que você está controlando.
                    O estoque real é controlado através de <strong>Itens</strong> e <strong>Lotes</strong>;<br></br>
                    Cuidado com os nomes que colocar nos produtos, pois ao cadastrar um item ou lote, os que estiverem vinculados a este produto terão o nome dele e ao criar um item ou lote eles automaticamente criam uma movimentação, e esta <strong>só pode ser apagada por um admin</strong>, logo, evite erros de digitação ou brincadeiras nos nomes dos produtos.
                  </p>
                </div>
              </div>
            </section>

            {/* Item */}
            <section id="item" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Características de um Item</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Foto:</strong> Foto de um item em específico</li>
                    <li><strong>Nome:</strong> Mesmo nome do produto ao qual está vinculado</li>
                    <li><strong>Código:</strong> Identificador único do Item (ex: "ITM-EBF99F41D0")</li>
                    <li><strong>Proprietário:</strong> É do Cnat Maker ou é do IFRN</li>
                    <li><strong>Disponibilidade:</strong> Diz se o item ainda está no laboratório</li>
                    <li><strong>Emprestado:</strong> Diz se o item do laboratório foi emprestado a alguém</li>
                    <li><strong>Preço:</strong> Preço do item</li>
                    <li><strong>Data de Entrada:</strong> Quando o item foi adicionado ao estoque</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar um Item?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique em <strong>Itens</strong> no submenu</li>
                    <li>Clique no botão <strong>+ Novo Item</strong></li>
                    <li>Selecione o <strong>Produto</strong> ao qual o item pertence</li>
                    <li>O sistema gerará automaticamente um <strong>UUID único</strong> para o item</li>
                    <li>Adicione o <strong>Preço</strong></li>
                    <li>Adicione o proprietário (É do Cnat Maker ou é do IFRN)</li>
                    <li> Adicione uma <strong>Foto</strong> daquele item em específico (opcional)</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Quando for colocar uma foto, coloque a daquele item em específico e não uma genérica da internet;<br></br>
                  </p>
                </div>
              </div>
            </section>

            {/* Lote */}
            <section id="lote" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">5. Lote</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é um Lote?</h3>
                  <p className="leading-relaxed">
                    <strong>Lotes</strong> são produtos medidos em volume ou peso.
                    Ao contrário de Itens (que são individuais), Lotes permitem que você controle quantidades de uma única unidade. Por exemplo, 1kg de Filamento. Você controla quanto do conteúdo ainda resta naquele lote.

                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Características de um Lote</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Foto:</strong> Foto de um lote em específico</li>
                    <li><strong>Nome:</strong> Mesmo nome do produto ao qual está vinculado</li>
                    <li><strong>Código:</strong> Identificador único do lote (ex: "LOT-4A3C3C1E9D")</li>
                    <li><strong>Fornecedor:</strong> De quem foi adquirido o lote (Marca)</li>
                    <li><strong>Quantidade:</strong> Número total de unidades no lote</li>
                    <li><strong>Preço:</strong> Preço de um lote específico</li>
                    <li><strong>Data de Validade:</strong> Quando o lote vence (se aplicável)</li>
                    <li><strong>Data de Entrada:</strong> Quando o lote foi recebido</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Cadastrar um Lote?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Produtos</strong></li>
                    <li>Clique em <strong>Lotes</strong> no submenu</li>
                    <li>Clique no botão <strong>+ Novo Lote</strong></li>
                    <li>Selecione o <strong>Produto</strong> do lote</li>
                    <li>Insira a <strong>Quantidade</strong> de unidades</li>
                    <li>Digite o <strong>Preço do Lote</strong></li>
                    <li>Digite o nome do <strong>Fornecedor</strong></li>
                    <li>Adicione a <strong>Data de Validade</strong></li>
                    <li>Adicione uma <strong>Foto</strong> daquele lote em específico (opcional)</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Use Lotes para produtos com grande volume e uso frequente.
                    O sistema automaticamente reduz a quantidade do lote quando saídas ou empréstimos relacionadas a ele são criadas.
                  </p>
                </div>
              </div>
            </section>

            {/* Movimentação */}
            <section id="movimentacao" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">

              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">6. Movimentações</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Movimentação?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Movimentação</strong> é um registro do que aconteceu com os produtos. Serve para rastrear quando um produto saiu ou entrou no laboratório. Por exemplo, quando um item é emprestado, automaticamente uma movimentação é criada para registrar essa ação.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tipos de Movimentações</h3>
                  <div className="space-y-3 ml-4">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Entrada:</strong> Quando um item ou lote é adicionado ao estoque</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Saída:</strong> Quando um item ou lote é removido do estoque (não retorna)</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Empréstimo:</strong> Quando um item ou lote é emprestado para outro laboratório, uma pessoa e etc.</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Devolução:</strong> Quando um item ou lote é devolvido após um empréstimo</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Movimentações são importantes para rastrear seus produtos. São criadas automaticamente quando um empréstimo é criado, ocorre uma devolução, um item ou lote é criado, ou uma saída é registrada.
                  </p>
                </div>
              </div>
            </section>

            {/* Saída */}
            <section id="saida" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#1A955E] mb-4">7. Saídas</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">O que é uma Saída?</h3>
                  <p className="leading-relaxed">
                    Uma <strong>Saída</strong> é um registro de quando um item ou lote permanentemente deixa seu inventário.
                    Diferente de um Empréstimo (que deve retornar),
                    uma saída é definitiva. Por exemplo: Consumo interno de material e descarte de itens danificados.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Registrar uma Saída?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Saídas</strong></li>
                    <li>Clique no botão <strong>Registrar Saída</strong></li>
                    <li>Selecione o <strong>Tipo de Saída</strong> (Untário: para itens, Fracionado: para lotes)</li>
                    <li>Escolha o <strong>Produto</strong>, <strong>Item</strong> ou <strong>Lote</strong></li>
                    <li>Se for Lote, insira a <strong>Quantidade</strong> que está saindo</li>
                    <li>Escreva o nome do responsável por essa saída (O nome de quem está registrando ela)</li>
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
            <section id="emprestimo" className="bg-white rounded-lg shadow-md p-8 scroll-mt-24">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Criar um Empréstimo?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu lateral e clique em <strong>Empréstimos</strong></li>
                    <li>Se o solicitante ainda não estiver cadastrado clique em <strong>+ Adicionar Solicitante</strong> e preencha os campos Nome, Matrícula e Telefone e clique em Salvar</li>
                    <li>Clique no botão <strong> + Novo Empréstimo</strong></li>
                    <li>Selecione o <strong>Solicitante</strong> (pessoa ou departamento que solicitou)</li>
                    <li>Escolha o <strong>Item</strong> a emprestar</li>
                    <li>Defina a <strong>Data Prevista de Devolução</strong></li>
                    <li>Digite o responsável por esse empréstimo (O nome de quem está registrando ela)</li>
                    <li>Clique em <strong>Salvar</strong></li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Registrar uma Devolução?</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Acesse o menu <strong>Empréstimos</strong></li>
                    <li>Procure pelo empréstimo que está sendo devolvido (não tem a data de entrega)</li>
                    <li>Clique no botão da prancheta com uma seta para a esquerda</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠ Obs.:</strong> Apenas itens podem ser emprestados.
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
                  <li><strong>Movimentação:</strong> Registro de operações do estoque (Entradas, Saídas, Empréstimos e Devoluções)</li>
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
