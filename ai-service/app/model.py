from sklearn.cluster import KMeans

def cluster_logs(vectors, n_clusters=3):
    model = KMeans(n_clusters=n_clusters, n_init=10)
    labels = model.fit_predict(vectors)
    return labels
