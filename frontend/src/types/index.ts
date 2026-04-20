// src/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface Direction {
    id_direction: number;
    nom_direction: string;
    type: 'centrale' | 'regionale' | 'provinciale';
    description?: string;
    nombre_services?: number;
    nombre_personnels?: number;
  }
  
  export interface Service {
    id_service: number;
    nom_service: string;
    id_direction: number;
    direction_nom?: string;
    description?: string;
    nombre_postes?: number;
    nombre_personnels?: number;
  }
  
  export interface Carriere {
    id_carriere: number;
    categorie: string;
    indice: string;
    corps: string;
    grade: string;
    date_effet: string;
    description?: string;
    nombre_postes?: number;
  }
  
  export interface Poste {
    id_poste: number;
    titre_poste: string;
    indice: string;
    id_service: number;
    id_carriere: number;
    service_nom?: string;
    carriere_categorie?: string;
    carriere_corps?: string;
    carriere_grade?: string;
    description?: string;
    nombre_personnels?: number;
  }
  
  export interface Personnel {
    id_personnel: number;
    nom: string;
    prenom: string;
    tel: string;
    genre: 'M' | 'F';
    numero_cin: string;
    date_naissance: string;
    date_entree: string;
    motif_entree: string;
    ancien_travail?: string;
    id_direction: number;
    id_service: number;
    id_poste: number;
    id_etat: number;
    direction_nom?: string;
    service_nom?: string;
    poste_titre?: string;
    etat_nom?: string;
  }
  
  export interface Historique {
    id_historique: number;
    ancien_poste: string;
    ancien_direction: string;
    date_changement?: string;
    motif_changement?: string;
    id_personnel: number;
    personnel_nom?: string;
    personnel_prenom?: string;
  }
  
  export interface BaseRohi {
    id_rohi: number;
    immatricule: string;
    nom: string;
    prenom: string;
    poste: string;
    porte: string;
    telephone: string;
    direction: string;
    service: string;
    statut: 'actif' | 'inactif';
  }
  
  export interface BaseAugure {
    id_augure: number;
    agentMatricule: string;
    agentNom: string;
    agentCin: string;
    agentDateNais?: string;
    corpsCode?: string;
    gradeCode?: string;
    indice?: string;
    categorieCode?: string;
    posteAgentNumero?: string;
    titre?: string;
    structureRattachement: string;
    statutAgent: string;
    sanctionCode?: string;
    sanctionLibelle?: string;
    regCode?: string;
    regLibelle?: string;
    dateEffet?: string;
    intervalAge?: string;
  }
  
  export interface StatutAdmin {
    id_statut: number;
    nom_statut: string;
    type_statut: 'fonctionnaire' | 'prive';
    description?: string;
  }
  
  export interface SituationAdmin {
    id_situation: number;
    date_entrer?: string;
    situation: 'activite' | 'mise_disposition' | 'detachement' | 'disponibilite';
    destination?: string;
    date_depart?: string;
    commentaire?: string;
    id_personnel: number;
    personnel_nom?: string;
    personnel_prenom?: string;
  }
  
  export interface Etat {
    id_etat: number;
    nom_etat: 'Actif' | 'Inactif';
    cause_inactivite?: string;
    commentaire?: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
  
  export interface DashboardStats {
    totalPersonnels: number;
    totalDirections: number;
    totalServices: number;
    totalPostes: number;
    personnelsActifs: number;
    personnelsInactifs: number;
    hommes: number;
    femmes: number;
    tauxOccupation: number;
  }