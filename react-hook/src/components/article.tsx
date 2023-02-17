import React, { useCallback, useEffect, useMemo } from 'react';
import useAsync from '../hooks/useAsync';

const backendUrl = 'http://localhost:3000';

// 获取文章
const useArticles = () => {
  const { execute, loading, data, error } = useAsync(
    useCallback(async () => {
      const res = await fetch(`${backendUrl}/posts`);
      return await res.json();
    }, [])
  );
  useEffect(() => execute(), [execute]);
  return {
    articles: data,
    articlesLoading: loading,
    articlesError: error,
  };
};

// 获取分类
const useCategories = () => {
  const { execute, loading, data, error } = useAsync(
    useCallback(async () => {
      const res = await fetch(`${backendUrl}/categories`);
      return await res.json();
    }, [])
  );
  useEffect(() => execute(), [execute]);
  return {
    categories: data,
    categoriesLoading: loading,
    categoriesError: error,
  };
};

const useCombinedArticles = (articles: any, categories: any) => {
  // 将文章和分类结合在一起
  return useMemo(() => {
    // 如果没有文章或者分类就返回null
    if (!articles || !categories) return null;
    return articles.map((article: any) => {
      return {
        ...article,
        categorie: categories.find(
          (c: any) => String(c.id) === String(article.categoryId)
        ),
      };
    });
  }, [articles, categories]);
};

const useFilteredArticles = (articles: any, selectedCategory: any) => {
  // 实现按照分类过滤
  return useMemo(() => {
    if(!articles) return null;
    if(!selectedCategory) return articles
    return articles.filter((article:any) => {
      return String(article.categorie.name) === String(selectedCategory)
    })
  }, [articles, selectedCategory]);
};

export default function Article() {
  return <div>Article</div>;
}
