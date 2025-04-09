import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projetos',
  imports: [CommonModule, FormsModule, NavbarComponent, MatIconModule],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css',
  standalone: true
})
export class ProjetosComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any = null;
  expandedProjectId: number | null = null;
  searchTerm: string = '';

  novoProjeto() {
    this.selectedProject = {
      title: '',
      description: '',
      budget: 0,
      skillsRequired: '',
      deadline: new Date().toISOString(),
      status: '',
      createdDate: new Date().toISOString()
    };
  }

  get filteredProjects() {
    return this.projects.filter(project =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getUserProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projetos:', this.projects);
      },
      error: (err) => {
        console.error('Erro ao carregar projetos:', err);
      }
    })
  }

  editProject(project: any) {
    this.selectedProject = { ...project };
  }

  saveProject() {
    if (this.selectedProject.projectId) {
      this.projectService.updateProject(this.selectedProject.projectId, this.selectedProject).subscribe({
        next: () => {
          alert('Projeto atualizado!');
          this.selectedProject = null;
          this.ngOnInit();
        },
        error: (err) => {
          alert('Erro ao atualizar projeto: ');
        }
      });
    } else {
      if (!this.selectedProject.title || this.selectedProject.title.trim() === '') {
        alert('O campo título é obrigatório!');
        return;
      }

      this.projectService.createProject(this.selectedProject).subscribe({
        next: () => {
          alert('Projeto criado!');
          this.selectedProject = null;
          this.ngOnInit();
        },
        error: (err) => {
          alert('Erro ao salvar projeto: ' + err.error || err.message);
          console.log(err)
        }
      });
    }
  }

  deleteProject(projectId: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este projeto?');
    if (!confirmDelete) return;

    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        alert('Projeto excluído com sucesso!');
        this.ngOnInit(); // Atualiza a lista
      },
      error: (err) => {
        console.error('Erro ao excluir projeto:', err);
        alert('Erro ao excluir o projeto ');
      }
    });
  }

  toggleDetails(projectId: number) {
    this.expandedProjectId = this.expandedProjectId === projectId ? null : projectId;
  }

}
