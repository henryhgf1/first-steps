package com.loja.calcados.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity // 1. MÁGICA: Avisa o banco que isso vai virar uma tabela chamada "produtos"
@Table(name = "produtos")
public class Produto {

    @Id // 2. MÁGICA: Diz que o ID é a Chave Primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // O banco de dados vai gerar o número (1, 2, 3...) sozinho
    private Long id;

    private String nome;
    private String descricao;
    private String categoriaFaixaEtaria;

    // 3. MÁGICA: Relação 1 para Muitos (1 Produto tem Várias Variações)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "produto_id") // Cria uma coluna na tabela de variações para ligar as duas coisas
    private List<ProdutoVariacao> variacoes = new ArrayList<>();

    // CONSTRUTOR VAZIO: Obrigatório para o Hibernate/Banco de Dados funcionar nos bastidores
    public Produto() {
    }

    // CONSTRUTOR COM DADOS: O que nós vamos usar no nosso código (sem o ID, pois o banco gera)
    public Produto(String nome, String descricao, String categoriaFaixaEtaria) {
        this.nome = nome;
        this.descricao = descricao;
        this.categoriaFaixaEtaria = categoriaFaixaEtaria;
    }

    // Método para adicionar um novo tamanho/cor a este produto
    public void adicionarVariacao(ProdutoVariacao variacao) {
        this.variacoes.add(variacao);
    }

    // Método de negócio: Pegar todas as cores disponíveis
    public List<String> getCoresDisponiveis() {
        List<String> cores = new ArrayList<>();
        for (ProdutoVariacao v : variacoes) {
            if (!cores.contains(v.getCor()) && v.isDisponivel()) {
                cores.add(v.getCor());
            }
        }
        return cores;
    }

    // Getters: O Spring Boot precisa deles para conseguir ler e enviar os dados para o Front-end
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public String getCategoriaFaixaEtaria() { return categoriaFaixaEtaria; }
    public List<ProdutoVariacao> getVariacoes() { return variacoes; }
}