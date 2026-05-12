"use client";
import React, { use, useCallback, useEffect, useMemo } from "react";
import { FormikProps } from "formik";
import { useQuery } from "@tanstack/react-query";
import { SendHorizonal, DiamondPlus, ChevronLeft } from "lucide-react";

import Button from "@/ui/button";
import Select from "@/ui/select";

import apiEndpoints from "@/utils/endpoints";
import axiosInstance from "@/utils/axiosInstance";

import { RoleFormType } from "@/types/role/form";
import { Checkbox, Label } from "@heroui/react";
import { RoleDetailsType } from "@/types/role/details";
import { useRouter } from "next/navigation";
import { PermissionsByModuleType } from "@/types/permission/list";
import { GroupedModule } from "@/types/permission/details";

type Props = {
  formik: FormikProps<RoleFormType>;
  roles: { label: string; value: string }[];
  permissions: GroupedModule[];
};

const Add: React.FC<Props> = ({ formik, roles, permissions }) => {
  const roleId = formik.values.role ?? "";

  const selected = formik.values.permissions ?? [];

  const router = useRouter();

  // Fast lookup for checkbox checked state
  const selectedSet = useMemo(() => {
    return new Set(selected.map((p) => p.permissionId));
  }, [selected]);

  // prevents stale selected problems (functional update)
  const togglePermission = useCallback(
    (permissionId: string) => {
      const selected = formik.values.permissions ?? [];
      const isSelected = selected.some((p) => p.permissionId === permissionId);

      formik.setFieldValue(
        "permissions",
        isSelected
          ? selected.filter((p) => p.permissionId !== permissionId)
          : [...selected, { permissionId }],
      );
    },
    [formik.values.permissions, formik],
  );

  return (
    <div className="py-3 w-full h-full flex flex-col gap-4 bg-surface rounded-lg">
      <div className="flex gap-2 px-3 items-center  justify-between w-full">
        <div className="flex w-full gap-2">
          <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
            {/* <div className="rounded-lg bg-primary/10 text-primary dark:text-white flex items-center justify-center aspect-square w-6 h-6 "> */}
            <DiamondPlus width={18} />
          </div>
          <h2 className="text-base font-medium">Edit Role</h2>
        </div>

        <Button type="button" size="sm" className="self-end" startIcon={ChevronLeft} onClick={() => router.push("/roles")}>Back</Button>
      </div>
      <form
        className="flex flex-col w-full gap-4 px-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="max-w-3xs">
          <Select
            label="Role"
            name="role"
            placeholder="Select Role"
            options={roles}
            formik={formik}
          />
        </div>

        {/* {!roleId ? (<p className="text-sm text-default-500"> Select a role to load permissions. </p>)
          : (permissions.map((perm) => {
            const checked = selectedSet.has(perm.id);
            return (
              <Checkbox size="sm" key={perm.id} isSelected={checked} onValueChange={() => togglePermission(perm.id)}>
                {perm.key}
                {perm.description
                  ? `: ${perm.description}`
                  : ""}
              </Checkbox>
            );
          })
          )} */}

        {/* {!roleId ? (
          <p className="text-sm text-default-500">
            Select a role to load permissions.
          </p>
        ) : permissions?.length && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {permissions
              .slice()
              .sort((a, b) => (a.module?.order ?? 999) - (b.module?.order ?? 999))
              .map((group) => (
                <div key={group.module.id} className="rounded-lg border border-default-200 p-3 bg-content2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-default-700">
                      {group.module.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.permissions.map((perm) => {
                      const checked = selectedSet.has(perm.id);

                      return (
                        <Checkbox
                          size="sm"
                          key={perm.id}
                          isSelected={checked}
                          onValueChange={() => togglePermission(perm.id)}
                        >
                          {perm.key?.split("_").pop()}
                        </Checkbox>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )} */}
        {/* {permissions?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {permissions
              .slice()
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((module) => (
                <div key={module.id} className="rounded-lg border border-default-200 p-3 bg-content2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-default-700">{module.name}</p>
                  </div>
        
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {module.permissions.map((perm) => {
                      const checked = selectedSet.has(perm.id);
        
                      return (
                        <Checkbox
                          size="sm"
                          key={perm.id}
                          isSelected={checked}
                          onValueChange={() => togglePermission(perm.id)}
                        >
                          {perm.key?.split("_").pop() ?? perm.key}
                        </Checkbox>
                      );
                    })}
                  </div>
         
                  {module.children?.length > 0 && (
                    <div className="pl-4 mt-2 border-l border-default-300">
                      {module.children.map((child) => (
                        <div key={child.id} className="mb-2">
                          <p className="text-sm font-semibold text-default-600">{child.name}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {child.permissions.map((perm) => {
                              const checked = selectedSet.has(perm.id);
                              return (
                                <Checkbox
                                  size="sm"
                                  key={perm.id}
                                  isSelected={checked}
                                  onValueChange={() => togglePermission(perm.id)}
                                >
                                  {perm.key?.split("_").pop() ?? perm.key}
                                </Checkbox>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )} */}


        {permissions?.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {permissions
              .slice()
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((module) => (
                <div key={module.id} className="rounded-lg border border-default-200 p-3 bg-content2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-default-700">{module.name}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {module.permissions.map((perm) => {
                      const checked = selectedSet.has(perm.id);

                      return (
                        <Checkbox
                          key={perm.id}
                          isSelected={checked}
                          onChange={() => togglePermission(perm.id)}
                        >
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>

                          <Checkbox.Content>
                            <Label>
                              {perm.key?.split("_").pop() ?? perm.key}
                            </Label>
                          </Checkbox.Content>
                        </Checkbox>
                      );
                    })}
                  </div>

                  {/* Optional: render child modules recursively */}
                  {/* Render child modules */}
                  {module.children?.length > 0 && (
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {module.children.map((child) => (
                        <div
                          key={child.id}
                          className="mb-2 border border-default-300 p-4 rounded-lg bg-content1"
                        >
                          <p className="text-sm font-semibold text-default-600 mb-4">
                            {child.name}
                          </p>

                          {/* Permissions */}
                          {child.permissions?.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {child.permissions.map((perm) => {
                                const checked = selectedSet.has(perm.id);

                                return (
                                  <Checkbox
                                    key={perm.id}
                                    isSelected={checked}
                                    onChange={() => togglePermission(perm.id)}
                                  >
                                    <Checkbox.Control>
                                      <Checkbox.Indicator />
                                    </Checkbox.Control>

                                    <Checkbox.Content>
                                      <Label>
                                        {perm.key?.split("_").pop() ?? perm.key}
                                      </Label>
                                    </Checkbox.Content>
                                  </Checkbox>
                                );
                              })}
                            </div>
                          )}

                          {/* Nested children (3rd level like role/user) */}
                          {child.children?.length > 0 && (
                            <div className="mt-3 space-y-3">
                              {child.children.map((subChild) => (
                                <div
                                  key={subChild.id}
                                  className="border border-default-200 p-3 rounded-md bg-content2"
                                >
                                  <p className="text-xs font-semibold text-default-500 mb-2">
                                    {subChild.name}
                                  </p>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {subChild.permissions.map((perm) => {
                                      const checked = selectedSet.has(perm.id);

                                      return (
                                        <Checkbox
                                          key={perm.id}
                                          isSelected={checked}
                                          onChange={() => togglePermission(perm.id)}
                                        >
                                          <Checkbox.Control>
                                            <Checkbox.Indicator />
                                          </Checkbox.Control>

                                          <Checkbox.Content>
                                            <Label>
                                              {perm.key?.split("_").pop() ?? perm.key}
                                            </Label>
                                          </Checkbox.Content>
                                        </Checkbox>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" className="w-24  rounded-lg" >Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Add;
