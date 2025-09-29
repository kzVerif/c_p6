import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GetAllApplications } from "@/utils/Coolify";

interface Data {
  id: number;
  description: string;
  repository_project_id: number;
  uuid: string;
  name: string;
  fqdn: string;
  config_hash: string;
  git_repository: string;
  git_branch: string;
  git_commit_sha: string;
  git_full_url: string;
  docker_registry_image_name: string;
  docker_registry_image_tag: string;
  build_pack: string;
  static_image: string;
  install_command: string;
  build_command: string;
  start_command: string;
  ports_exposes: string;
  ports_mappings: string;
  custom_network_aliases: string;
  base_directory: string;
  publish_directory: string;
  health_check_enabled: boolean;
  health_check_path: string;
  health_check_port: string;
  health_check_host: string;
  health_check_method: string;
  health_check_return_code: number;
  health_check_scheme: string;
  health_check_response_text: string;
  health_check_interval: number;
  health_check_timeout: number;
  health_check_retries: number;
  health_check_start_period: number;
  limits_memory: string;
  limits_memory_swap: string;
  limits_memory_swappiness: number;
  limits_memory_reservation: string;
  limits_cpus: string;
  limits_cpuset: string;
  limits_cpu_shares: number;
  status: string;
  preview_url_template: string;
  destination_type: string;
  destination_id: number;
  source_id: number;
  private_key_id: number;
  environment_id: number;
  dockerfile: string;
  dockerfile_location: string;
  custom_labels: string;
  dockerfile_target_build: string;
  manual_webhook_secret_github: string;
  manual_webhook_secret_gitlab: string;
  manual_webhook_secret_bitbucket: string;
  manual_webhook_secret_gitea: string;
  docker_compose_location: string;
  docker_compose: string;
  docker_compose_raw: string;
  docker_compose_domains: string;
  docker_compose_custom_start_command: string;
  docker_compose_custom_build_command: string;
  swarm_replicas: number;
  swarm_placement_constraints: string;
  custom_docker_run_options: string;
  post_deployment_command: string;
  post_deployment_command_container: string;
  pre_deployment_command: string;
  pre_deployment_command_container: string;
  watch_paths: string;
  custom_healthcheck_found: boolean;
  redirect: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  compose_parsing_version: string;
  custom_nginx_configuration: string;
  is_http_basic_auth_enabled: boolean;
  http_basic_auth_username: string;
  http_basic_auth_password: string;
}


export default async function Page() {
  const servers = await GetAllApplications()
  console.log(servers);
  

  return (
    <div className="flex flex-col items-center min-h-screen container space-y-6 py-10">
      <h1 className="text-4xl font-semibold text-center">แอพพลิเคชันของฉัน</h1>
      <hr className="border-gray-300 w-full max-w-3xl" />

      <div className="w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server: Data) => (
            <Card
              key={server.uuid}
              className="shadow-lg hover:shadow-xl transition rounded-xl"
            >
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {server.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {server.description}
                  </p>
                </div>
                <Badge
                  variant={
                    server.status.includes("running")
                      ? "default"
                      : "destructive"
                  }
                  className="px-3 py-1 text-sm"
                >
                  {server.status}
                </Badge>
              </CardHeader>

              {/* Content */}
<<<<<<< HEAD
              <CardContent className="space-y-1 text-gray-700">
                <p className="font-medium">วันที่หมดอายุ</p>
                <p className="text-sm">{server.expire}</p>
=======
              <CardContent className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Domain:</span>{" "}
                  <a
                    href={server.fqdn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {server.fqdn}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Repository:</span>{" "}
                  {server.git_repository}
                </p>
                <p className="text-sm text-gray-500">
                  อัปเดตล่าสุด: {new Date(server.updated_at).toLocaleString()}
                </p>
>>>>>>> 94be8996ef47df6a1c4eac7afa37c910f4335596
              </CardContent>

              {/* Footer */}
              <CardFooter className="flex flex-wrap justify-end gap-2">
                <Button variant="secondary">Restart</Button>
                <Button variant="outline">Stop</Button>
                <Button variant="destructive">Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
